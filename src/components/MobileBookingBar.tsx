import React from 'react';
import { Star, X } from 'lucide-react';
import { PropertyData, DateRange } from '../types/villa';
import {
  calculateStayRates,
  getCurrentDisplayRate,
  calculateGST,
  getRateBadgeText,
} from '../lib/pricing';
import { BookingWidget } from './BookingWidget';

interface MobileBookingBarProps {
  property: PropertyData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dates?: DateRange;
  guests?: string;
  onDatesChange?: (range: DateRange, guests: string) => void;
}

export const MobileBookingBar: React.FC<MobileBookingBarProps> = ({
  property,
  open,
  onOpenChange,
  dates,
  guests = '2',
  onDatesChange,
}) => {
  const stayCalc = calculateStayRates(dates?.from, dates?.to, {
    baseNightlyRate: property.nightlyRate,
    seasonalRates: property.seasonalRates,
    weekendMultiplier: property.weekendRateMultiplier ?? 1.1,
    newYearRate: property.newYearRate,
  });

  const currentDisplay = getCurrentDisplayRate(
    property.nightlyRate,
    property.seasonalRates,
    property.weekendRateMultiplier ?? 1.1
  );

  const nights = stayCalc.nights;
  const subtotal = stayCalc.subtotal;
  const effectiveRate = stayCalc.averageNightlyRate;
  const cleaning = nights > 0 ? property.cleaningFee : 0;
  const subtotalAfterFees = subtotal + cleaning;
  const gst = property.gstApplicable ? calculateGST(subtotalAfterFees) : 0;
  const total = subtotalAfterFees + gst;

  const displayRate = nights > 0 ? effectiveRate : currentDisplay.rate;
  const badgeLabel = nights > 0 ? getRateBadgeText(stayCalc) : currentDisplay.label;

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-primary">
                ₹{displayRate.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                / night{property.gstApplicable ? ' + GST' : ''}
                {badgeLabel ? ` · ${badgeLabel}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{property.rating}</span>
              <span>· {property.reviewCount} reviews</span>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center">
            <button
              onClick={() => onOpenChange(true)}
              className="bg-primary px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform active:scale-95 cursor-pointer hover:bg-primary/90"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Check Availability
                </h3>
                <p className="text-xs text-muted-foreground">
                  Enter your details and select your dates
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="overflow-y-auto max-h-[calc(92vh-80px)]">
              <BookingWidget
                property={property}
                initialGuests={guests}
                initialDates={dates}
                onDatesChange={onDatesChange}
                isMobileModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
