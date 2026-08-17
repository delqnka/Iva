"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  version?: string;
};

const OPEN_GALLERY_EVENT = "reset-body-lab:open-gallery";

export function OpenGalleryButton({
  children,
  className = "btn btn-light"
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_GALLERY_EVENT))}
    >
      {children}
    </button>
  );
}

export function GalleryPreview({
  images,
  label,
  moreLabel
}: {
  images: GalleryImage[];
  label: string;
  moreLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openGallery = () => setIsOpen(true);
    window.addEventListener(OPEN_GALLERY_EVENT, openGallery);
    return () => window.removeEventListener(OPEN_GALLERY_EVENT, openGallery);
  }, []);

  return (
    <>
      <div className="gallery-strip" aria-label={label}>
        {images.slice(0, 3).map((image) => (
          <Image
            key={`${image.src}-${image.version ?? "local"}`}
            src={image.src}
            alt={image.alt}
            width={900}
            height={1100}
            sizes="(max-width: 520px) 33vw, (max-width: 1040px) 100vw, 33vw"
          />
        ))}
      </div>
      <div className="gallery-section__more">
        <button type="button" className="gallery-more-link" onClick={() => setIsOpen(true)}>
          {moreLabel}
        </button>
      </div>

      {isOpen ? (
        <div className="gallery-overlay" role="dialog" aria-modal="true" onClick={() => setIsOpen(false)}>
          <div className="gallery-overlay__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-overlay__close"
              aria-label="Close gallery"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} strokeWidth={2} />
            </button>
            <div className="gallery-overlay__grid">
              {images.map((image) => (
                <Image
                  key={`${image.src}-${image.version ?? "local"}-full`}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 520px) 100vw, (max-width: 1040px) 50vw, 33vw"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
