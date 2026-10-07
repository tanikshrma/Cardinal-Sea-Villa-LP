import React, { useState, useEffect } from 'react';
import { PropertyData } from '../types/villa';

interface NavbarProps {
  property: PropertyData;
  onBookClick?: () => void;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Location', href: '#location' },
  { label: 'Policies', href: '#policies' },
];

export const Navbar: React.FC<NavbarProps> = ({ property: _property }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between sm:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/cardinal-stay-logo.png"
            alt="Cardinal Hotels & Resorts Logo"
            className={`h-9 w-auto object-contain transition-all sm:h-11 ${
              scrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-xs uppercase tracking-widest transition-colors hover:text-accent ${
                  scrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#booking"
            className="bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105"
          >
            Check Availability
          </a>
        </div>
      </nav>
    </header>
  );
};
