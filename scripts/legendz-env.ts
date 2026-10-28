/* ══════════════════════════════════════════════════════════════════════
   Imported FIRST by every script that writes to MongoDB (seed,
   reset-password, sync-indexes). Two jobs:

   1. Load env the way Next does: .env.local wins over .env. (Plain
      `dotenv/config` reads only .env, so a Legendz URI in .env.local was
      silently ignored by the scripts.)

   2. Refuse to touch any database that isn't clearly the Legendz one. This
      codebase was copied from another salon's project; a leftover URI must
      never let a script write to that salon's live data. The database name
      in MONGODB_URI must contain "legendz", e.g.
        mongodb+srv://USER:PASS@CLUSTER.mongodb.net/legendz-salon?appName=…
      A URI with no database name would land in Mongo's default "test"
      database, so that is refused too.
   ══════════════════════════════════════════════════════════════════════ */
import { config } from "dotenv"

config({ path: [".env.local", ".env"], quiet: true })

const uri = process.env.MONGODB_URI?.trim().replace(/^["']|["']$/g, "") ?? ""
const match = uri.match(/^mongodb(?:\+srv)?:\/\/(?:[^@/]*@)?([^/?]+)\/?([^?]*)/)
const host = match?.[1] ?? "(unparseable)"
const dbName = decodeURIComponent(match?.[2] ?? "")

console.log(`Target MongoDB → host: ${host}  database: ${dbName || "(none — would default to \"test\")"}`)

if (!match || !/legendz/i.test(dbName)) {
  console.error(
    "❌ Refusing to run: the database name in MONGODB_URI must contain \"legendz\".\n" +
      "   Put the Legendz connection string in .env.local with the database name in the path,\n" +
      "   e.g. …mongodb.net/legendz-salon?appName=…"
  )
  process.exit(1)
}

console.log("✅ Database name is a Legendz database — continuing.")
