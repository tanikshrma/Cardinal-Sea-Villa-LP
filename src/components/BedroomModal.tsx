import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Waves,
  Bath,
  Wind,
  Trees,
  Sun,
  BookOpen,
  Laptop,
  Armchair,
  Shirt,
  Building,
  Eye,
  Maximize2,
  DoorOpen,
  Palette,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { Bedroom } from '../types/villa';

interface BedroomModalProps {
  bedroom: Bedroom | null;
  open: boolean;
  onClose: () => void;
}

function getFeatureIcon(featureName: string): LucideIcon {
  const lower = featureName.toLowerCase();
  if (/bath/i.test(lower)) return Bath;
  if (/sea|ocean|beach|pool|water/i.test(lower)) return Waves;
  if (/green|tree|garden/i.test(lower)) return Trees;
  if (/balcony|sun|terrace/i.test(lower)) return Sun;
  if (/air|ac|conditioned|breeze/i.test(lower)) return Wind;
  if (/bed|sleep/i.test(lower)) return BedDouble;
  if (/read|book/i.test(lower)) return BookOpen;
  if (/desk|work/i.test(lower)) return Laptop;
  if (/chair|seating|lounge/i.test(lower)) return Armchair;
  if (/wardrobe|closet|cupboard/i.test(lower)) return Shirt;
  if (/floor/i.test(lower)) return Building;
  if (/panoramic|panoroma|view/i.test(lower)) return Eye;
  if (/spacious|space|large/i.test(lower)) return Maximize2;
  if (/door|glass/i.test(lower)) return DoorOpen;
  if (/aesthetic|design|decor/i.test(lower)) return Palette;
  if (/dressing|vanity|table/i.test(lower)) return Sparkles;
  return Sparkles;
}

export const BedroomModal: React.FC<BedroomModalProps> = ({
  bedroom,
  open,
  onClose,
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (open) setCurrentImg(0);
  }, [open, bedroom]);

  const handleNext = useCallback(() => {
    if (bedroom && bedroom.images.length > 0) {
      setCurrentImg((prev) => (prev + 1) % bedroom.images.length);
    }
  }, [bedroom]);

  const handlePrev = useCallback(() => {
    if (bedroom && bedroom.images.length > 0) {
      setCurrentImg((prev) => (prev - 1 + bedroom.images.length) % bedroom.images.length);
    }
  }, [bedroom]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose, handlePrev, handleNext]);

  if (!open || !bedroom) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Carousel */}
        <div className="relative aspect-[16/10] bg-muted">
          {bedroom.images && bedroom.images.length > 0 ? (
            <img
              src={bedroom.images[currentImg]}
              alt={`${bedroom.name} — view ${currentImg + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <BedDouble className="h-12 w-12" />
            </div>
          )}

          {bedroom.images && bedroom.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md transition-colors hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md transition-colors hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {bedroom.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImg(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImg ? 'w-6 bg-accent' : 'w-2 bg-background/60'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bedroom Details */}
        <div className="p-6 sm:p-8">
          <div className="mb-1">
            <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {bedroom.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BedDouble className="h-4 w-4 text-accent" />
            {bedroom.bed}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {bedroom.description}
          </p>

          <div className="mt-5">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Room Features
            </h4>
            <div className="flex flex-row flex-wrap gap-2">
              {bedroom.features.map((feature) => {
                const Icon = getFeatureIcon(feature);
                return (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {feature}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
