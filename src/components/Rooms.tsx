import React, { useState } from 'react';
import { BedDouble, ArrowRight, Plus } from 'lucide-react';
import { PropertyData, Bedroom } from '../types/villa';
import { BedroomModal } from './BedroomModal';

interface RoomsProps {
  property: PropertyData;
}

export const Rooms: React.FC<RoomsProps> = ({ property }) => {
  const [selectedBedroom, setSelectedBedroom] = useState<Bedroom | null>(null);

  return (
    <section id="rooms" className="bg-card/30 py-10 sm:py-12">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Sleeping Arrangement
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Bedrooms
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {property.bedrooms.length} beautifully appointed bedrooms, each with a comfortable double bed.
          </p>
        </div>

        <div className={`mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 ${
          property.bedrooms.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        }`}>
          {property.bedrooms.map((bedroom) => (
            <button
              key={bedroom.name}
              onClick={() => setSelectedBedroom(bedroom)}
              className="group border border-border bg-background/50 p-5 text-left transition-all hover:border-accent/50 hover:shadow-lg sm:p-8 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 text-accent sm:h-14 sm:w-14">
                <BedDouble className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground sm:mt-6 sm:text-2xl">
                {bedroom.name}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                {bedroom.bed}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4">
                View details
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Extra Bed Notice Card */}
        <div className="mt-6 flex items-center gap-3 border border-border bg-background/50 p-4 sm:mt-8 sm:gap-4 sm:p-6">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent sm:h-12 sm:w-12">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-foreground sm:text-lg">
              Extra Bed — Floor Mattress
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Additional floor mattress available for 1 person. Charges apply.
            </p>
          </div>
        </div>
      </div>

      <BedroomModal
        bedroom={selectedBedroom}
        open={!!selectedBedroom}
        onClose={() => setSelectedBedroom(null)}
      />
    </section>
  );
};
