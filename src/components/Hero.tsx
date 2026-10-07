import React from 'react';
import { BedDouble, Users, MapPin, Waves, ArrowRight } from 'lucide-react';
import { PropertyData } from '../types/villa';

interface HeroProps {
  property: PropertyData;
  onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ property, onBookClick }) => {
  const highlights = [
    { icon: Users, label: `Guest Capacity: ${property.sleeps} Guests` },
    { icon: BedDouble, label: `${property.bedrooms.length} Bedrooms` },
    { icon: Waves, label: 'Private Pool' },
    { icon: MapPin, label: property.region },
  ];

  const handleCheckAvailability = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024 && onBookClick) {
      e.preventDefault();
      onBookClick();
    }
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={property.heroImage}
          alt={property.heroAlt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Enhanced Contrast Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35 lg:from-black/85 lg:via-black/55 lg:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

      {/* Content */}
      <div className="container relative z-10 py-24 pt-28 sm:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow & Prominent Guest Capacity */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-accent sm:w-14" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs sm:tracking-[0.35em]">
                {property.heroEyebrow}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-black/60 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
              <Users className="h-3.5 w-3.5 text-accent" />
              <span>Guest Capacity: <strong className="text-accent">{property.sleeps} Guests</strong> (4 Bedrooms)</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-semibold leading-[1.08] text-white drop-shadow-md sm:text-5xl lg:text-7xl">
            {property.name}
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              }}
              className="mt-2 block font-sans text-xl font-normal tracking-normal text-accent sm:text-3xl lg:text-4xl"
            >
              {property.subtitle}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:mt-8 sm:text-lg">
            {property.heroDescription}
          </p>

          {/* Highlights Row */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/40 py-4 backdrop-blur-[2px] sm:mt-10 sm:gap-x-8 sm:gap-y-4 sm:py-5">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white">
                <Icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                <span className="text-xs font-medium tracking-wide sm:text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <a
              href="#booking"
              onClick={handleCheckAvailability}
              className="group inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/30 sm:gap-3 sm:px-9 sm:py-4 sm:text-sm"
            >
              Check Availability
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#gallery"
              className="border border-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10 sm:px-9 sm:py-4 sm:text-sm"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>

      {/* Scroll mouse indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-accent/60 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
};
