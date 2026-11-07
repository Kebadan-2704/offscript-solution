'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  title: string;
  caption: string;
  aspectRatio: string;
}

interface WorkGalleryProps {
  gallery: GalleryItem[];
}

export function WorkGallery({ gallery }: WorkGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="py-12 border-b border-[#E6E2D9]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-[#D36B4D]" aria-hidden="true" />
        <h3
          id="gallery-heading"
          className="font-mono text-xs uppercase tracking-widest text-[#D36B4D] font-semibold"
        >
          Interface & System Artifacts
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gallery.map((item, idx) => (
          <button
            key={idx}
            type="button"
            data-testid="gallery-trigger"
            className="text-left w-full group cursor-pointer border border-[#E6E2D9] bg-white overflow-hidden focus-visible:outline-2 focus-visible:outline-[#D36B4D]"
            onClick={() => setSelectedImage(item)}
            aria-label={`View artifact ${item.title}`}
          >
            {/* Visual Frame */}
            <div className="relative aspect-[16/10] bg-[#E6E2D9]/40 border-b border-[#E6E2D9] flex items-center justify-center p-8 overflow-hidden">
              {/* Abstract Blueprint Render */}
              <div className="w-full h-full border border-dashed border-[#191B1E]/30 flex flex-col items-center justify-center p-6 text-center group-hover:scale-102 transition-transform duration-500">
                <span className="font-mono text-xs text-[#D36B4D] font-semibold uppercase mb-2">
                  System View 0{idx + 1}
                </span>
                <span className="font-space text-lg font-bold text-[#191B1E] max-w-xs">
                  {item.title}
                </span>
                <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-[#6B6C67]">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-space text-lg font-semibold text-[#191B1E] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#6B6C67] leading-relaxed">
                {item.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Radix Dialog Lightbox */}
      <Dialog.Root open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 animate-[fadeIn_0.2s_ease]" />
          <Dialog.Content data-testid="gallery-dialog" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-4xl max-h-[90vh] bg-white border border-[#E6E2D9] p-6 sm:p-10 z-50 overflow-y-auto focus:outline-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E2D9] mb-6">
              <div>
                <Dialog.Title className="font-space text-2xl font-bold text-[#191B1E]">
                  {selectedImage?.title}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[#6B6C67] mt-1">
                  {selectedImage?.caption}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="p-2 border border-[#E6E2D9] text-[#191B1E] hover:border-[#191B1E] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Modal Image/Blueprint Frame */}
            <div className="aspect-[16/10] bg-[#F5F3ED] border border-[#E6E2D9] flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <span className="font-mono text-xs text-[#D36B4D] uppercase font-semibold mb-3">
                Full-Resolution Architecture Visualization
              </span>
              <h3 className="font-space text-3xl font-bold text-[#191B1E] max-w-lg mb-4">
                {selectedImage?.title}
              </h3>
              <p className="text-base text-[#6B6C67] max-w-md leading-relaxed">
                {selectedImage?.caption}
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

