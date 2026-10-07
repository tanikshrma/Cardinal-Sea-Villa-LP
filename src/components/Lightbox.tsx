import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types/villa';

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  images: GalleryImage[];
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentIndex,
  onClose,
  onNavigate,
  images,
}) => {
  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, onNavigate, images.length]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, onNavigate, images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 sm:right-5 sm:top-5 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-2 sm:left-5 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative flex max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] flex-col items-center overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[75vh] max-w-full object-contain shadow-2xl"
          />
          {currentImage.alt && (
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between rounded-lg bg-black/60 px-3 py-2 sm:px-4 sm:py-2.5 text-xs text-white backdrop-blur-md sm:text-sm">
              <span className="font-medium text-white/95 line-clamp-1">{currentImage.alt}</span>
              <span className="ml-2 sm:ml-3 shrink-0 rounded bg-white/20 px-2 py-0.5 text-[10px] sm:text-xs text-white/80">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-2 sm:right-5 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>
    </div>
  );
};
