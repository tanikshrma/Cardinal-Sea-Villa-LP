import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { PropertyData } from '../types/villa';

interface FooterProps {
  property: PropertyData;
}

export const Footer: React.FC<FooterProps> = ({ property }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12 sm:py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3 sm:gap-12">
          {/* Brand info */}
          <div>
            <a href="#" className="inline-block">
              <img
                src="/cardinal-stay-logo.png"
                alt="Cardinal Hotels & Resorts Logo"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Luxury villa holidays in {property.region}. Lavish interiors, private pools, and remarkable service for families, couples and friends.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href={`tel:${property.phone}`} className="hover:text-accent transition-colors">
                  {property.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${property.email}`} className="hover:text-accent transition-colors">
                  {property.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{property.address}</span>
              </li>
            </ul>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: 'Overview', href: '#overview' },
                { label: 'Amenities', href: '#amenities' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Rooms', href: '#rooms' },
                { label: 'Policies', href: '#policies' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Cardinal Stay. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Luxury Villa Rentals · {property.region}
          </p>
        </div>
      </div>
    </footer>
  );
};
