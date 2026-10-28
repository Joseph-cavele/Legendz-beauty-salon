# Legendz images

Client photos and the logo live in this folder (`public/legendz/`). Slots without a photo yet show the labelled placeholders in `placeholders/`.

To fill or change a slot:

1. Copy the file here.
2. In `lib/salon-assets.ts`, set that slot's `src` to the file, and update its `alt` text so it describes the photo.

| Slot (`lib/salon-assets.ts`) | Shown on | File |
|---|---|---|
| `logo` | Header, login card, dashboard sidebar | `legendz/logo.jpg` |
| `hero` | Home page hero | `legendz/IMG-20261002-WA0032.jpg` |
| `salonInterior` | About section | `legendz/IMG-20261002-WA0010.jpg` |
| `salonStation` | About inset, login backdrop | `legendz/IMG-20261002-WA0002.jpg` |
| `category.Dreadlocks` | Dreadlocks cards | `legendz/IMG-20261002-WA0001.jpg` |
| `category.Braids` | Braids cards | `legendz/15102f85….jpg` ⚠ |
| `category.Nails` | Nails cards | `legendz/0271f82f… (1) (1).jpg` ⚠ |
| `category.Hair` | Hair cards | `legendz/blow out.jpg` ⚠ |
| `category.Weave` | Weave cards | `legendz/weave installations.jpg` ⚠ |
| `service` overrides | Twist and style · Start with extension · Dye and Wash | `legendz/IMG-20261002-WA0011.jpg` · `images/cf930771….jpg` ⚠ · `images/36ac441d….jpg` ⚠ |
| `service` overrides | Knotless · Box braids · Curly | `images/long braids.jpg` ⚠ · `images/short braids.jpg` ⚠ · `legendz/ae240a43….jpg` ⚠ |
| `service` overrides | Gel on natural · Gel on tips · Art · Acrylic · Gel Style | `legendz/placeholders/17881d2e….jpg` ⚠ · `images/128cc34e….jpg` ⚠ · `legendz/3126f1fb….jpg` ⚠ · `legendz/66bb6490… (1).jpg` ⚠ · `legendz/52e7cef6….jpg` ⚠ |
| `weaveBanner` | /services banner, "Braids and weaves" slide | `images/wig installation.jpg` ⚠ |
| `bookingBanner` | /book hero, and /services "Book your visit" slide | `images/booking images.jpg` ⚠ |
| `gallery` (6 tiles) | Home "Recent Work" — salon's own photos only | WA0003, WA0033, WA0038, WA0044, WA0000, WA0017 |
| `stylist` | Stylists without a photo | `legendz/placeholders/stylist.svg` (placeholder) |

Not used, on purpose: WA0005 (same client and style as WA0002), WA0015 (same photo as WA0003), WA0016 (same look as WA0038), WA0022 (same client as WA0044), WA0042 (same look as WA0033). Also not used yet: `VID-20261002-WA0020.mp4`. To use the video in the About section's "Take a look inside" frame, set `VIDEO_SRC` in `components/site/site-about.tsx` to `/legendz/VID-20261002-WA0020.mp4`.

⚠ = an internet image, not Legendz's own work — replace with the salon's own photo when one exists and confirm the right to use any that stay. `long braids`, `short braids`, `wig installation`, `booking images` and `66bb6490…` are copies of photos from the Patrick Dreadlocks site; `52e7cef6…` shows another artist's watermark (@arnold_nails_tz). Unused: `legendz/1e162856….jpg` (duplicate of `short braids`). Everything in `public/` is publicly downloadable — delete unused files before going live.

Keep each photo under about 500 KB (JPG or WebP). Only use photos the salon owns, and that the people shown have agreed to.

Photos uploaded from the dashboard (for a service or stylist) go to Cloudinary instead, and take priority over these slots.
