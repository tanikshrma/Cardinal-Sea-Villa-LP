import React from 'react';
import { PropertyData } from '../types/villa';

interface OverviewProps {
  property: PropertyData;
}

export const Overview: React.FC<OverviewProps> = ({ property }) => {
  return (
    <section id="overview" className="py-10 sm:py-12">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              About the Villa
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {property.overviewTitle}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground sm:mt-6">
            {property.overviewText}
          </p>
        </div>

        <div className="mt-8 sm:mt-16 grid grid-cols-2 gap-2.5 sm:gap-6 md:grid-cols-4">
          {property.stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-border bg-card/50 p-3.5 sm:p-6 md:p-8 text-center transition-colors hover:border-accent/50"
            >
              <div className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="mt-1.5 sm:mt-2 text-[10px] min-[400px]:text-xs uppercase tracking-wider sm:tracking-widest text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
