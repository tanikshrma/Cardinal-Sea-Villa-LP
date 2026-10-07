import React, { useState } from 'react';
import { PropertyData } from '../types/villa';
import { Lightbox } from './Lightbox';

interface GalleryProps {
  property: PropertyData;
}

export const Gallery: React.FC<GalleryProps> = ({ property }) => {
  const images = property.galleryImages;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-10 sm:py-12">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary sm:text-sm">
              Inside the Villa
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Gallery
          </h2>
        </div>

        <div className="mt-8 sm:mt-16 grid auto-rows-[130px] min-[400px]:auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[250px] grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3">
          {images.map((image, idx) => (
            <div
              key={image.src + idx}
              className={`group relative cursor-pointer overflow-hidden border border-border ${
                image.span ?? ''
              }`}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        images={images}
      />
    </section>
  );
};
