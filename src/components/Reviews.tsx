import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { PropertyData } from '../types/villa';

interface ReviewsProps {
  property: PropertyData;
}

export const Reviews: React.FC<ReviewsProps> = ({ property }) => {
  return (
    <section id="reviews" className="bg-card/40 py-10 border-y border-border sm:py-12">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Guest Experiences
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Rated {property.rating.toFixed(1)} Stars on Google
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
            Read real feedback from guests who spent their holiday at {property.name}.
          </p>
        </div>

        <div className="mt-8 sm:mt-16 grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-3">
          {property.reviews.map((review) => (
            <div
              key={review.id}
              className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 min-[400px]:p-5 sm:p-6 shadow-sm transition-all hover:border-accent/60 hover:shadow-md"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground text-sm">
                      {review.author}
                    </span>
                    {review.verified && (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review.source} · {review.date}
                  </span>
                </div>
                <span className="rounded bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  Verified Guest
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
