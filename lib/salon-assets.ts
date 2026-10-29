/* ══════════════════════════════════════════════════════════════════════
   IMAGE SLOTS — every photograph and the logo the site shows, in one place.

   Two sources:
     /public/legendz/  the salon's OWN photos (Legendz clients, the salon).
     /public/images/   images the site owner added from the internet
                       (2026-10-13) for Braids, Nails, Hair and Weave, which
                       had no Legendz photo yet. They are NOT Legendz work:
                       swap each for the salon's own photo as soon as one
                       exists, and confirm the right to use any that stay.
                       Never use them in "Recent Work", which claims to be
                       the salon's own work.

   To fill a slot: put the file in /public/legendz/, change that one path
   below, and update its `alt` so it describes what the photo shows.
   ══════════════════════════════════════════════════════════════════════ */

const photo = (file: string) => encodeURI(`/legendz/${file}`)
/** Internet image from /public/images — see the note above. */
const stock = (file: string) => encodeURI(`/images/${file}`)
const placeholder = (name: string) => `/legendz/placeholders/${name}.svg`

export type ImageSlot = { src: string; alt: string }

export const salonImages = {
  /** Square logo mark — header, login card, dashboard sidebar. */
  logo: { src: photo("logo.jpg"), alt: "Legendz logo" },

  /** Full-bleed hero backdrop on the home page and /book. */
  hero: {
    src: photo("IMG-20261002-WA0032.jpg"),
    alt: "Client with waist-length locs seated in front of the Legendz sign",
  },

  /** About section main frame. 4:3 crop. */
  salonInterior: {
    src: photo("IMG-20261002-WA0010.jpg"),
    alt: "Stylist working on a client's long locs inside Legendz, beside the salon's service banner",
  },

  /** About section inset and login backdrop. Square. */
  salonStation: {
    src: photo("IMG-20261002-WA0002.jpg"),
    alt: "Locs styled into a sculpted updo with twisted sides, in front of the Legendz sign",
  },

  /** Fallback headshot for stylists without an uploaded photo. Square. */
  stylist: { src: placeholder("stylist"), alt: "Placeholder – stylist portrait" },

  /** One photo per service category, used on cards, /services and /book. */
  category: {
    Dreadlocks: {
      src: photo("IMG-20261002-WA0001.jpg"),
      alt: "Curled locs with copper highlights gathered into a high puff",
    },
    Braids: {
      src: photo("15102f85a854dead8f1d56fb95a6bd04.jpg"),
      alt: "Knotless braids being installed, parted in neat rows at the nape",
    },
    Nails: {
      src: photo("0271f82f427a22b7db3b01261f55d5f8 (1) (1).jpg"),
      alt: "Almond nails in nude and brown with gold chrome swirls and studs",
    },
    Hair: {
      src: photo("blow out.jpg"),
      alt: "Shoulder-length natural hair blown out full and smooth",
    },
    Weave: {
      src: photo("weave installations.jpg"),
      alt: "Sleek, straight, jet-black install with a natural-looking parting",
    },
  } as Record<string, ImageSlot>,

  /** Per-service photos, keyed by the exact service name. Override the
      category photo so two cards side by side never show the same picture. */
  service: {
    "Twist and style": {
      src: photo("IMG-20261002-WA0011.jpg"),
      alt: "Back view of locs twisted and rolled into a low updo",
    },
    "Gel on natural": {
      src: photo("placeholders/17881d2e61a3b14eceeb9a8bde501cd5.jpg"),
      alt: "Short natural nails in glossy deep-red gel",
    },
    "Gel on tips": {
      src: stock("128cc34ee97e387010ffbe5a229cc58b.jpg"),
      alt: "Almond nails with brown and cream French tips, polka dots and a painted flower",
    },
    Art: {
      src: photo("3126f1fb6afa2c81562e8a17a93d26ef.jpg"),
      alt: "Almond nails with red French tips and a red flower design",
    },
    Acrylic: {
      src: photo("66bb64901b805bae731095695b0484e7 (1).jpg"),
      alt: "Square nails with pink French tips, animal-print accents and 3D flowers",
    },
    "Gel Style": {
      src: photo("35abd7ca51daacdb6da70e38a6bcefc6.jpg"),
      alt: "Long square nails with white French tips, brown flowers and animal-print accents",
    },
    Pedicure: {
      src: photo("033bd32d367c9d2df7736af922cdcd6d.jpg"),
      alt: "Toenails in soft pink with gold chrome French tips",
    },
    Knotless: {
      src: stock("long braids.jpg"),
      alt: "Long knotless braids in brown and honey blonde with loose curly ends",
    },
    "Box braids": {
      src: stock("short braids.jpg"),
      alt: "Shoulder-length box braids with a centre part and curly ends",
    },
    Curly: {
      src: photo("ae240a43e2b6d2bfe1a2925b0fef824f.jpg"),
      alt: "Long, defined curly braids framing the face",
    },
    "Start with natural hair": {
      src: photo("IMG-20261002-WA0015.jpg"),
      alt: "Back view of fresh two-strand twists on natural hair, finished with curled ends",
    },
    Crochet: {
      src: photo("IMG-20261002-WA0005.jpg"),
      alt: "Locs gathered into a rolled updo with twisted sides at the hairline",
    },
    "Permanent Fibre": {
      src: photo("e3d002ae25dff8a8840eefbc8eab110e.jpg"),
      alt: "Long black and copper locs swept back from twisted sides",
    },
    "Wash only": {
      src: photo("IMG-20261002-WA0016.jpg"),
      alt: "Back view of clean, full locs curled into a puff",
    },
    "Start with extension": {
      src: stock("cf93077137ad8a0aeee83293487a8021.jpg"),
      alt: "Long locs in copper and dark brown, worn loose past the shoulders",
    },
    "Dye and Wash": {
      src: stock("36ac441dfc05ef430e51de7ec54aa331.jpg"),
      alt: "Shoulder-length locs coloured with honey-blonde highlights and gold cuffs",
    },
  } as Record<string, ImageSlot>,

  /** Banner slide on /services for braids and weaves. Legendz has no wig
      service; this lace-front photo only illustrates the weave slide. */
  /** Salon interior — the /book page hero and the "Book your visit" slide
      on /services. Not the Legendz salon: replace with a photo of the real
      salon when there is one. */
  bookingBanner: {
    src: stock("booking images.jpg"),
    alt: "Salon styling stations with gold chairs and backlit mirrors",
  },

  weaveBanner: {
    src: stock("wig installation.jpg"),
    alt: "Long, straight lace-front install with an inset close-up of the hairline",
  },

  /** "Recent work" gallery tiles. Portrait, 4:5. All dreadlocks work.
      Each tile is a different look, and none of these files is used in any
      other slot — don't repeat a photo (or the same client's same style)
      that already appears elsewhere on the site. */
  gallery: [
    { src: photo("IMG-20261002-WA0003.jpg"), label: "Twists & Curled Ends", alt: "Back view of twisted locs finished with curled ends" },
    { src: photo("IMG-20261002-WA0033.jpg"), label: "High Loc Bun", alt: "Locs twisted up from the hairline into a high bun" },
    { src: photo("IMG-20261002-WA0038.jpg"), label: "Curls & Statement Twist", alt: "Curled loc updo with a single long twist falling at the front" },
    { src: photo("IMG-20261002-WA0044.jpg"), label: "Criss-Cross Bun", alt: "Back view of locs criss-crossed up into a bun" },
    { src: photo("IMG-20261002-WA0000.jpg"), label: "Twisted Updo", alt: "Top view of locs twisted back from the hairline into a coiled updo" },
    { src: photo("IMG-20261002-WA0017.jpg"), label: "Twist & Curl", alt: "Twisted sides leading into a curled loc updo" },
  ],
}

/** The category photo for a service, falling back to the Dreadlocks slot. */
export const categoryImage = (category: string | undefined): ImageSlot =>
  (category && salonImages.category[category]) || salonImages.category.Dreadlocks

/** A service's own photo if it has one, otherwise its category's. */
export const serviceImage = (name: string, category: string | undefined): ImageSlot =>
  salonImages.service[name] ?? categoryImage(category)
