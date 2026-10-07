import React, { useState } from 'react';
import {
  Shield,
  Calendar,
  Info,
  ChevronDown,
  Tag,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { PropertyData } from '../types/villa';

interface PoliciesProps {
  property: PropertyData;
}

export const Policies: React.FC<PoliciesProps> = ({ property }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'house-rules': true,
    cancellation: false,
    'things-to-know': false,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section id="policies" className="bg-card/30 py-10 border-y border-border sm:py-12">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Good to Know
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Policies & Information
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground sm:text-base">
            Everything you need to know before your stay at {property.name}.
          </p>
        </div>

        <div className="mx-auto mt-6 sm:mt-16 max-w-5xl space-y-3.5 sm:space-y-6">
          {/* House Rules */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card px-4 min-[400px]:px-6 sm:px-8 shadow-sm transition-all">
            <button
              type="button"
              onClick={() => toggleItem('house-rules')}
              className="flex w-full items-center justify-between py-4.5 sm:py-7 text-left hover:no-underline cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground sm:text-2xl">
                    House Rules
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[10px] min-[400px]:text-xs uppercase tracking-wider text-muted-foreground">
                    {property.houseRules.length} guidelines
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  openItems['house-rules'] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openItems['house-rules'] && (
              <div className="border-t border-border pb-6 pt-5 sm:pb-8">
                <ul className="grid flex-1 gap-4">
                  {property.houseRules.map((rule, idx) => (
                    <li key={rule.title} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 text-[11px] font-bold text-accent sm:h-7 sm:w-7 sm:text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                          {rule.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {rule.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cancellation Policy */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card px-4 min-[400px]:px-6 sm:px-8 shadow-sm transition-all">
            <button
              type="button"
              onClick={() => toggleItem('cancellation')}
              className="flex w-full items-center justify-between py-4.5 sm:py-7 text-left hover:no-underline cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground sm:text-2xl">
                    Cancellation Policy
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[10px] min-[400px]:text-xs uppercase tracking-wider text-muted-foreground">
                    Flexible & non-refundable
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  openItems['cancellation'] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openItems['cancellation'] && (
              <div className="border-t border-border pb-6 pt-5 sm:pb-8 flex flex-col">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Standard Policy
                </p>
                <ul className="space-y-2">
                  {property.standardCancellation.map((tier) => (
                    <li
                      key={tier.label}
                      className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2.5 sm:px-4 sm:py-3 gap-2"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent sm:h-2 sm:w-2" />
                        <span className="text-xs font-semibold text-foreground sm:text-sm whitespace-nowrap">
                          {tier.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground sm:text-xs text-right">
                        {tier.detail}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-lg border border-accent/40 bg-gradient-to-br from-accent/10 to-primary/5 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-accent shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                      Non-Refundable Rate
                    </p>
                    <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground shrink-0">
                      10% OFF
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Book at least 15 days prior to check-in. Use code{' '}
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-bold text-primary sm:text-xs">
                      NONREFUNDABLE
                    </span>{' '}
                    at booking. Non-cancelable and non-amendable.
                  </p>
                </div>

                <div className="mt-3 flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/60" />
                  <p className="text-[11px] leading-relaxed text-muted-foreground/70 sm:text-xs">
                    Dec 22 – Jan 7: full refund 30 days before check-in, none after. Bank charges deducted. Refunds within 15 working days.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Things to Know */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card px-4 min-[400px]:px-6 sm:px-8 shadow-sm transition-all">
            <button
              type="button"
              onClick={() => toggleItem('things-to-know')}
              className="flex w-full items-center justify-between py-4.5 sm:py-7 text-left hover:no-underline cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Info className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground sm:text-2xl">
                    Things to Know
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[10px] min-[400px]:text-xs uppercase tracking-wider text-muted-foreground">
                    Before you arrive
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  openItems['things-to-know'] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openItems['things-to-know'] && (
              <div className="border-t border-border pb-6 pt-5 sm:pb-8 flex flex-col">
                <ul className="grid flex-1 gap-3">
                  {property.thingsToKnow.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 sm:gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-1 min-[360px]:grid-cols-2 gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                        Check-in
                      </p>
                      <p className="text-xs font-semibold text-foreground sm:text-sm">
                        2:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                        Check-out
                      </p>
                      <p className="text-xs font-semibold text-foreground sm:text-sm">
                        11:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
