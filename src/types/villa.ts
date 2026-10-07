export interface StatItem {
  value: string;
  label: string;
}

export interface AmenityItem {
  icon: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: string;
}

export interface Bedroom {
  name: string;
  bed: string;
  features: string[];
  description: string;
  images: string[];
}

export interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  source: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface HouseRule {
  title: string;
  description: string;
}

export interface CancellationTier {
  label: string;
  detail: string;
}

export interface SeasonalRate {
  startDate: string;
  endDate: string;
  rate: number;
  label?: string;
}

export interface PropertyData {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  region: string;
  location: string;
  heroImage: string;
  heroAlt: string;
  rating: number;
  reviewCount: number;
  nightlyRate: number;
  newYearRate?: number;
  seasonalRates: SeasonalRate[];
  weekendRateMultiplier?: number;
  gstApplicable: boolean;
  sleeps: number;
  cleaningFee: number;
  address: string;
  phone: string;
  email: string;
  website: string;
  plusCode: string;
  googleMapsUrl: string;
  mapEmbedSrc: string;
  overviewTitle: string;
  overviewText: string;
  stats: StatItem[];
  heroEyebrow: string;
  heroDescription: string;
  locationIntro: string;
  amenities: AmenityItem[];
  bedrooms: Bedroom[];
  galleryImages: GalleryImage[];
  houseRules: HouseRule[];
  standardCancellation: CancellationTier[];
  nearbyPlaces: NearbyPlace[];
  thingsToKnow: string[];
  reviews: Review[];
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface BookingFormData {
  name: string;
  email?: string;
  phone: string;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string;
}
