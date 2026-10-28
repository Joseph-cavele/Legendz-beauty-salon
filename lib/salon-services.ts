// Legendz Beauty Salon's service list — the ONE copy.
//
// Both halves of the app read from here: the marketing pages (/, /services)
// render it directly, and `npm run seed` upserts it into the `Service`
// collection that drives booking. So a name, price or category changes in
// one place and the price list and the booking flow can never disagree.
//
// PRICES: only the Dreadlocks prices are confirmed by the salon. Every other
// service has `price: null`, which the whole app renders as "Price on
// request" — never as R0. When the salon confirms a price, set it here and
// re-run the seed, or edit it in the dashboard (the seed never overwrites a
// price entered there for a service that is still `null` here).
//
// DURATIONS ARE PLACEHOLDER ESTIMATES, not figures from the salon. They drive
// the booking calendar, so confirm them with the salon before taking real
// bookings.

import { formatPrice } from "./currency"
import { salonImages, serviceImage } from "./salon-assets"

/** Must match SERVICE_CATEGORIES in features/services/schema.ts. */
export type LegendzCategory = "Dreadlocks" | "Braids" | "Nails" | "Hair" | "Weave"

export type LegendzService = {
  name: string
  category: LegendzCategory
  /** Rand. `null` = not confirmed yet, shown as "Price on request". */
  price: number | null
  /** Minutes. Placeholder estimate — see the note at the top. */
  duration: number
  description: string
}

const SCALP = "Scalp treatment included."

export const legendzServices: LegendzService[] = [
  // ── Dreadlocks (prices confirmed; scalp treatment included) ─────────
  { name: "Start with natural hair", category: "Dreadlocks", price: 270, duration: 240, description: `Dreadlocks started on your own natural hair. ${SCALP}` },
  { name: "Start with extension", category: "Dreadlocks", price: 300, duration: 300, description: `Dreadlocks started with extensions added. ${SCALP}` },
  { name: "Twist and style", category: "Dreadlocks", price: 250, duration: 90, description: `Retwist and a finished style for your locs. ${SCALP}` },
  { name: "Crochet", category: "Dreadlocks", price: 280, duration: 150, description: `Crochet maintenance on your locs. ${SCALP}` },
  { name: "Permanent Fibre", category: "Dreadlocks", price: 1000, duration: 300, description: `Permanent fibre locs. ${SCALP}` },
  { name: "Wash only", category: "Dreadlocks", price: 60, duration: 30, description: `A wash for your locs. ${SCALP}` },
  { name: "Dye and Wash", category: "Dreadlocks", price: 80, duration: 60, description: `Colour and a wash for your locs. ${SCALP}` },

  // ── Braids (price to be confirmed) ──────────────────────────────────
  { name: "Styled back line", category: "Braids", price: null, duration: 120, description: "Styled back-line braids." },
  { name: "Straight back line", category: "Braids", price: null, duration: 90, description: "Straight back-line braids." },
  { name: "Straight up", category: "Braids", price: null, duration: 120, description: "Braids done straight up." },
  { name: "Knotless", category: "Braids", price: null, duration: 300, description: "Knotless braids." },
  { name: "Box braids", category: "Braids", price: null, duration: 300, description: "Box braids." },

  // ── Nails (price to be confirmed) ───────────────────────────────────
  { name: "Gel on tips", category: "Nails", price: null, duration: 90, description: "Gel applied over tips." },
  { name: "Gel on natural", category: "Nails", price: null, duration: 60, description: "Gel on your natural nails." },
  { name: "Acrylic", category: "Nails", price: null, duration: 90, description: "Acrylic nails." },
  { name: "Buff & Shine", category: "Nails", price: null, duration: 30, description: "Buff and shine." },
  { name: "Pedicure", category: "Nails", price: null, duration: 60, description: "Pedicure." },
  { name: "Soak off", category: "Nails", price: null, duration: 30, description: "Soak-off removal." },
  { name: "Art", category: "Nails", price: null, duration: 30, description: "Nail art." },
  { name: "Gel Style", category: "Nails", price: null, duration: 60, description: "Styled gel nails." },

  // ── Hair (price to be confirmed) ────────────────────────────────────
  { name: "Own hair", category: "Hair", price: null, duration: 60, description: "Styling on your own hair." },
  { name: "Pony tail", category: "Hair", price: null, duration: 60, description: "Pony tail." },
  { name: "Curly", category: "Hair", price: null, duration: 90, description: "Curly style." },
  { name: "Blow out", category: "Hair", price: null, duration: 45, description: "Blow out." },
  { name: "Dye or curly", category: "Hair", price: null, duration: 90, description: "Dye or curly style." },

  // ── Weave (price to be confirmed) ───────────────────────────────────
  { name: "Weave installation", category: "Weave", price: null, duration: 120, description: "Weave installation." },
]

/** URL segment for a service — also half of the seed's upsert key. */
export const serviceSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/* ── Marketing views ──────────────────────────────────────────────────── */

export type ServiceItem = {
  name: string
  /** Display string: Rand, or "Price on request". */
  price: string
}

export type ServiceCategory = {
  title: string
  items: ServiceItem[]
}

const CATEGORY_ORDER: LegendzCategory[] = ["Dreadlocks", "Braids", "Nails", "Hair", "Weave"]

export const serviceCategories: ServiceCategory[] = CATEGORY_ORDER.map((category) => ({
  title: category,
  items: legendzServices
    .filter((s) => s.category === category)
    .map((s) => ({ name: s.name, price: formatPrice(s.price) })),
}))

export type FeaturedService = {
  name: string
  from: string
  description: string
  image: string
  alt: string
  /**
   * Aggregate score out of 5, and how many reviews it came from. Left unset:
   * the card shows a rating row only when both exist, and there are no real
   * Legendz reviews yet. Never fill these with invented numbers.
   */
  rating?: number
  reviewCount?: number
}

/** One service per category leads the home page and gets a detail page. */
const FEATURED = ["Start with natural hair", "Twist and style", "Knotless", "Gel on natural", "Blow out", "Weave installation"]

export const featuredServices: FeaturedService[] = FEATURED.map((name) => {
  const s = legendzServices.find((x) => x.name === name)
  if (!s) throw new Error(`salon-services: featured service "${name}" is not in the list`)
  const img = serviceImage(s.name, s.category)
  return { name: s.name, from: formatPrice(s.price), description: s.description, image: img.src, alt: img.alt }
})

export type CatalogItem = ServiceItem & {
  description?: string
  image?: string
  alt?: string
}

export type CatalogCategory = {
  title: string
  items: CatalogItem[]
}

export const serviceCatalog: CatalogCategory[] = CATEGORY_ORDER.map((category) => {
  return {
    title: category,
    items: legendzServices
      .filter((s) => s.category === category)
      .map((s) => {
        const img = serviceImage(s.name, s.category)
        return {
          name: s.name,
          price: formatPrice(s.price),
          description: s.description,
          image: img.src,
          alt: img.alt,
        }
      }),
  }
})

/** Service name → its photo, for the booking wizard (which reads services from the DB). */
export const serviceImageByName: Record<string, { image: string; alt: string }> =
  Object.fromEntries(
    legendzServices.map((s) => {
      const img = serviceImage(s.name, s.category)
      return [s.name, { image: img.src, alt: img.alt }]
    })
  )

/** "Recent work" gallery tiles — see lib/salon-assets.ts to fill them. */
export const galleryItems = salonImages.gallery
