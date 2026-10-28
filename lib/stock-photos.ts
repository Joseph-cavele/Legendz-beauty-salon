// Images used by the booking flow. These are the same slots as the marketing
// site (lib/salon-assets.ts) — currently labelled placeholders until the
// salon supplies approved photos. Kept as its own module so the booking
// wizard's imports did not change in the rebrand.
import { categoryImage, salonImages } from "./salon-assets"

export const stockPhotos = {
  hero: salonImages.hero.src,
  salonInterior: salonImages.salonInterior.src,
  stylistHeadshots: [salonImages.stylist.src],
}

/** Fallback thumbnail for a service, by category. */
export function serviceThumb(category: string | undefined) {
  return categoryImage(category).src
}
