import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Compass,
  Star,
} from 'lucide-react';
import { PropertyData } from '../types/villa';

interface LocationProps {
  property: PropertyData;
}

export const Location: React.FC<LocationProps> = ({ property }) => {
  return (
    <section id="location" className="py-10 sm:py-12">
      <div>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Location & Address
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {property.name}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
            {property.locationIntro}
          </p>

          <div className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 sm:px-4 py-1.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">
              {property.rating.toFixed(1)} / 5.0 Rating on Google Maps
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* Property Details Card */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 min-[400px]:p-5 sm:p-6 shadow-sm lg:col-span-5">
            <div>
              <h3 className="font-serif text-xl min-[400px]:text-2xl font-bold text-foreground">
                Property Details
              </h3>
              <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Address</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {property.address}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs text-primary">
                      Plus Code: {property.plusCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Phone className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Phone</p>
                    <a
                      href={`tel:${property.phone}`}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {property.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Mail className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${property.email}`}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary break-all"
                    >
                      {property.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Clock className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Hours & Services</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Open 24 hours · Caretaker & 24h Security on-site
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3">
              <a
                href={property.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow transition-colors hover:bg-primary/90 text-center"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map iframe */}
          <div className="relative min-h-[250px] min-[400px]:min-h-[300px] overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:min-h-[440px] lg:col-span-7">
            <iframe
              title={`${property.name} Google Maps`}
              src={property.mapEmbedSrc}
              className="h-full w-full min-h-[250px] min-[400px]:min-h-[300px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mt-8 sm:mt-16">
          <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
              <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg min-[400px]:text-xl sm:text-2xl font-bold text-foreground">
                Nearby Attractions & Distances
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground sm:text-sm">
                Distances measured from {property.name}
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {property.nearbyPlaces.map((place) => (
              <div
                key={place.name}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/60 sm:p-4"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{place.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                      {place.type}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-serif text-sm font-semibold text-primary sm:text-base">
                  {place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
