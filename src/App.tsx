import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { seaVillaData } from './data/sea-villa';
import { DateRange } from './types/villa';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Amenities } from './components/Amenities';
import { Gallery } from './components/Gallery';
import { Rooms } from './components/Rooms';
import { Location } from './components/Location';
import { Reviews } from './components/Reviews';
import { Policies } from './components/Policies';
import { BookingWidget } from './components/BookingWidget';
import { MobileBookingBar } from './components/MobileBookingBar';
import { Footer } from './components/Footer';

export default function App() {
  const property = seaVillaData;

  // Read URL search params
  const [dates, setDates] = useState<DateRange>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const checkinStr = params.get('checkin');
      const checkoutStr = params.get('checkout');
      const from = checkinStr ? new Date(checkinStr) : undefined;
      const to = checkoutStr ? new Date(checkoutStr) : undefined;
      return {
        from: from && !isNaN(from.getTime()) ? from : undefined,
        to: to && !isNaN(to.getTime()) ? to : undefined,
      };
    } catch {
      return {};
    }
  });

  const [guests, setGuests] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('guests') || '2';
    } catch {
      return '2';
    }
  });

  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

  // Sync state to URL search parameters
  const updateUrlParams = useCallback((newDates: DateRange, newGuests: string) => {
    try {
      const url = new URL(window.location.href);
      if (newDates.from) {
        url.searchParams.set('checkin', format(newDates.from, 'yyyy-MM-dd'));
      } else {
        url.searchParams.delete('checkin');
      }

      if (newDates.to) {
        url.searchParams.set('checkout', format(newDates.to, 'yyyy-MM-dd'));
      } else {
        url.searchParams.delete('checkout');
      }

      if (newGuests) {
        url.searchParams.set('guests', newGuests);
      } else {
        url.searchParams.delete('guests');
      }

      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore if URL api fails in restricted environments
    }
  }, []);

  const handleDatesChange = useCallback(
    (newRange: DateRange, newGuests: string) => {
      setDates(newRange);
      setGuests(newGuests);
      updateUrlParams(newRange, newGuests);
    },
    [updateUrlParams]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <Navbar
        property={property}
        onBookClick={() => setMobileBookingOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          property={property}
          onBookClick={() => setMobileBookingOpen(true)}
        />

        {/* Main Content Layout */}
        <div className="relative">
          <div className="container py-12 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
              {/* Left Column: Property Details & Highlights */}
              <div className="min-w-0 space-y-2">
                <Overview property={property} />
                <Amenities property={property} />
                <Gallery property={property} />
                <Rooms property={property} />
                <Location property={property} />
                <Reviews property={property} />
                <Policies property={property} />
              </div>

              {/* Right Column: Sticky Booking Widget (Desktop) */}
              <aside id="booking" className="hidden lg:block">
                <div className="sticky top-28">
                  <BookingWidget
                    property={property}
                    initialGuests={guests}
                    initialDates={dates}
                    onDatesChange={handleDatesChange}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer property={property} />

      {/* Mobile Sticky Booking Bar and Drawer Modal */}
      <MobileBookingBar
        property={property}
        open={mobileBookingOpen}
        onOpenChange={setMobileBookingOpen}
        dates={dates}
        guests={guests}
        onDatesChange={handleDatesChange}
      />

      {/* Spacer on mobile so content isn't hidden under sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
