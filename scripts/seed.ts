import "./legendz-env" // must stay first: loads env and refuses non-Legendz databases
import { connectDB } from "../lib/db"
import { ServiceModel } from "../lib/models/Service"
import { StylistModel } from "../lib/models/Stylist"
import { UserModel } from "../lib/models/User"
import { legendzServices, serviceSlug } from "../lib/salon-services"
import {
  SALON_CONTACT_PERSON,
  SALON_EMAIL,
  SALON_HOURS_DISPLAY,
  SALON_PHONE_DISPLAY,
} from "../lib/salon-contact"
import { ownerEmailFromEnv, ownerNameFromEnv } from "../lib/owner-account"

/* ══════════════════════════════════════════════════════════════════════
   Legendz seed — IDEMPOTENT. Run it as often as you like; it never creates
   duplicates and never deletes anything.

   Services   upserted on { category, slug } (slug from the name). Name and
              category are kept in step with lib/salon-services.ts. A
              confirmed price there is always applied; for a "price on
              request" service the seed never touches the price, so a price
              entered later in the dashboard survives a re-run. Description
              and duration are set only when the service is first created,
              so dashboard edits to those survive too.
   Stylist    Luyanda Thabethe, upserted by email, offered every service.
   Owner      dashboard login for OWNER_EMAIL (.env), created if missing.
              No password: the owner signs in with a one-time code emailed
              to that address (features/auth/server/login-code.ts).

   No customers, bookings or notifications are created or copied.
   ══════════════════════════════════════════════════════════════════════ */

async function seed() {
  await connectDB()
  const ownerEmail = ownerEmailFromEnv()
  const ownerExists = !ownerEmail || !!(await UserModel.exists({ email: ownerEmail }))

  // ── Services ────────────────────────────────────────────────────────
  const result = await ServiceModel.bulkWrite(
    legendzServices.map((s) => {
      const slug = serviceSlug(s.name)
      return {
        updateOne: {
          filter: { category: s.category, slug },
          update: {
            $set: {
              name: s.name,
              category: s.category,
              slug,
              ...(s.price !== null ? { price: s.price } : {}),
            },
            $setOnInsert: { description: s.description, duration: s.duration },
          },
          upsert: true,
        },
      }
    })
  )
  const serviceIds = (
    await ServiceModel.find({
      $or: legendzServices.map((s) => ({ category: s.category, slug: serviceSlug(s.name) })),
    }).select("_id")
  ).map((d) => d._id)

  // ── Stylist ─────────────────────────────────────────────────────────
  await StylistModel.updateOne(
    { email: SALON_EMAIL },
    {
      $set: { name: SALON_CONTACT_PERSON, phone: SALON_PHONE_DISPLAY, active: true },
      $setOnInsert: { workingHours: SALON_HOURS_DISPLAY },
      $addToSet: { services: { $each: serviceIds } },
    },
    { upsert: true }
  )

  // ── Owner login ─────────────────────────────────────────────────────
  if (!ownerExists) {
    await UserModel.create({
      name: ownerNameFromEnv(),
      email: ownerEmail,
      role: "owner",
    })
  }

  const total = await ServiceModel.countDocuments({ slug: { $exists: true } })
  // matchedCount = already existed (their updatedAt is refreshed on every run).
  console.log(
    `Services: ${result.upsertedCount} created, ${result.matchedCount} already existed ` +
      `(${total} seeded services in the database).`
  )
  console.log(`Stylist: ${SALON_CONTACT_PERSON} <${SALON_EMAIL}> — offers ${serviceIds.length} services.`)
  console.log(
    !ownerEmail
      ? "Owner login skipped: set OWNER_EMAIL in .env."
      : ownerExists
        ? `Owner login ${ownerEmail} already exists.`
        : `Owner login created: ${ownerEmail} (signs in with an emailed code).`
  )
  /* The app caches the service list (unstable_cache, tag "services") on disk
     in .next/cache, so a seed run while the app is up isn't visible until
     that cache is cleared or its 300s revalidate passes. */
  console.log("If the app is running: rm -rf .next/cache and restart, or wait 5 minutes.")
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
