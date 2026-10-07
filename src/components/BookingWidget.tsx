import React, { useState, useEffect } from 'react';
import {
  Star,
  Sparkles,
  Zap,
  User,
  Phone,
  Calendar,
  Users,
  Check,
  Loader2,
  Car,
  Bell,
  MapPin,
} from 'lucide-react';
import { format, startOfDay } from 'date-fns';
import { PropertyData, DateRange, BookingFormData, BookingFormErrors } from '../types/villa';
import {
  calculateStayRates,
  getCurrentDisplayRate,
  calculateGST,
  getRateBadgeText,
} from '../lib/pricing';
import { CalendarPicker } from './CalendarPicker';

interface BookingWidgetProps {
  property: PropertyData;
  initialGuests?: string;
  initialDates?: DateRange;
  onDatesChange?: (range: DateRange, guests: string) => void;
  isMobileModal?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  property,
  initialGuests = '2',
  initialDates,
  onDatesChange,
  isMobileModal = false,
}) => {
  const [step, setStep] = useState<'contact' | 'dates' | 'done'>('contact');
  const [submitting, setSubmitting] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);

  // Form states
  const [range, setRange] = useState<DateRange>(() => initialDates || {});
  const [guests, setGuests] = useState<string>(() => initialGuests);
  const [form, setForm] = useState<BookingFormData>({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});

  // Sync dates & guests to parent or URL
  useEffect(() => {
    if (onDatesChange) {
      onDatesChange(range, guests);
    }
  }, [range, guests, onDatesChange]);

  // Pricing calculations
  const stayCalc = calculateStayRates(range.from, range.to, {
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

  const validateContact = (): boolean => {
    const newErrors: BookingFormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!form.phone.trim() || form.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDates = (): boolean => {
    const newErrors: BookingFormErrors = {};
    if (!range.from || !range.to) {
      newErrors.date = 'Please select check-in and check-out dates';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToDates = () => {
    if (validateContact()) {
      if (!range.from) {
        setRange({ from: startOfDay(new Date()), to: undefined });
      }
      setStep('dates');
    }
  };

  const handleSubmitBooking = () => {
    if (!validateContact()) {
      setStep('contact');
      return;
    }
    if (!validateDates()) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep('done');
    }, 1200);
  };

  const handleReset = () => {
    setStep('contact');
    setRange({});
    setGuests('2');
    setForm({ name: '', phone: '' });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      {/* Header */}
      <div className="border-b border-border bg-primary px-6 py-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            {ratesLoading && range.from ? (
              <span className="flex items-center gap-2 font-serif text-2xl font-bold">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-normal text-primary-foreground/70">
                  Fetching live rates…
                </span>
              </span>
            ) : (
              <>
                <span className="font-serif text-2xl font-bold">
                  ₹{displayRate.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-primary-foreground/70">
                  {' '}/ night{property.gstApplicable ? ' + GST' : ''}
                </span>
                {badgeLabel && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    <Sparkles className="h-3 w-3" />
                    {badgeLabel}
                  </span>
                )}
                {!badgeLabel && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    <Zap className="h-3 w-3" />
                    Live Rate
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{property.rating}</span>
            <span className="text-xs text-primary-foreground/60">
              · {property.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Step 1: Contact Form */}
        {step === 'contact' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Enter your details to check availability and get a personalised quote for{' '}
                <span className="font-semibold text-foreground">{property.name}</span>.
              </p>
            </div>

            <div>
              <label
                htmlFor="booking-name"
                className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <User className="h-4 w-4" />
                Full Name
              </label>
              <input
                id="booking-name"
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="John Doe"
                className={`w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-hidden transition-colors focus:border-accent ${
                  errors.name ? 'border-destructive' : ''
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="booking-phone"
                className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+91 98765 43210"
                className={`w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-hidden transition-colors focus:border-accent ${
                  errors.phone ? 'border-destructive' : ''
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handleContinueToDates}
              className="w-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all enabled:hover:scale-[1.02] enabled:hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Continue to Dates
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Your details are saved securely · No charge until confirmation
            </p>
          </div>
        )}

        {/* Step 2: Dates & Guests */}
        {step === 'dates' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">
                Select your stay dates below.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Select Check-in & Check-out
              </label>
              <div className="flex justify-center rounded-lg border border-border bg-background/50 p-2">
                <CalendarPicker
                  selected={range}
                  onSelect={(r) => {
                    setRange(r ?? {});
                    if (errors.date) setErrors({ ...errors, date: undefined });
                  }}
                  className="mx-auto"
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-xs text-destructive">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="booking-guests"
                className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Users className="h-4 w-4" />
                Guests
              </label>
              <div className="relative">
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-hidden transition-colors focus:border-accent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                    <option key={g} value={String(g)}>
                      {g} {g === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price breakdown if nights selected */}
            {nights > 0 && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ₹{effectiveRate.toLocaleString('en-IN')} avg / night × {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                    {(stayCalc.hasSeasonalRate || stayCalc.hasWeekendPremium) && (
                      <span className="block text-[11px] text-accent">
                        {[
                          stayCalc.hasSeasonalRate && 'Seasonal rate applied',
                          stayCalc.hasWeekendPremium && 'Weekend rate included',
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span className="font-semibold text-foreground">
                    ₹{cleaning.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-serif text-xl font-bold text-primary">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                {property.gstApplicable && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Includes GST (18%)</span>
                    <span className="font-semibold text-foreground">
                      ₹{gst.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('contact')}
                className="px-4 py-3.5 text-sm font-semibold uppercase tracking-widest text-muted-foreground border border-border hover:bg-secondary transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                disabled={submitting || nights === 0}
                onClick={handleSubmitBooking}
                className="flex-1 bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-accent-foreground transition-all enabled:hover:scale-[1.02] enabled:hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Check Availability'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Done Confirmation */}
        {step === 'done' && (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">
              Inquiry Received!
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Thank you, {form.name.split(' ')[0]}. Our team will confirm availability for{' '}
              {range.from ? format(range.from, 'dd MMM') : 'your dates'}
              {range.to ? ` – ${format(range.to, 'dd MMM')}` : ''} within 12 hours and reach
              out at <span className="font-semibold text-foreground">{form.phone}</span>.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary hover:underline cursor-pointer"
            >
              New inquiry
            </button>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="border-t border-border bg-muted/30 px-6 py-4">
        <div className="space-y-2">
          {[
            { icon: Car, text: 'Secure booking · No hidden fees' },
            { icon: Bell, text: 'Personalised concierge service' },
            {
              icon: MapPin,
              text: `${property.address.split(',')[0]}, ${property.region}`,
            },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5 text-accent" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
