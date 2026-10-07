import React from 'react';
import {
  ShieldCheck,
  Shirt,
  Wifi,
  Waves,
  Sparkles,
  Car,
  Wind,
  Snowflake,
  LucideIcon,
} from 'lucide-react';
import { PropertyData } from '../types/villa';

interface AmenitiesProps {
  property: PropertyData;
}

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Shirt,
  Wifi,
  Waves,
  Sparkles,
  Car,
  Wind,
  Snowflake,
};

export const Amenities: React.FC<AmenitiesProps> = ({ property }) => {
  return (
    <section id="amenities" className="bg-card/30 py-10 sm:py-12">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Villa Highlights
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Premium Amenities
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Everything you need for a comfortable and luxurious stay.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4">
          {property.amenities.map((amenity) => {
            const Icon = ICON_MAP[amenity.icon] || Sparkles;
            return (
              <div
                key={amenity.label}
                className="group flex flex-col items-center justify-center border border-border/80 bg-card p-6 text-center transition-all duration-300 hover:border-accent hover:shadow-xs sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 stroke-[1.5]" />
                </div>
                <span className="mt-4 font-serif text-[11px] font-medium uppercase tracking-[0.2em] text-foreground sm:mt-5 sm:text-xs">
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
