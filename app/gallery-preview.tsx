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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const openGallery = () => {
      setSelectedIndex(null);
      setIsOpen(true);
    };
    window.addEventListener(OPEN_GALLERY_EVENT, openGallery);
    return () => window.removeEventListener(OPEN_GALLERY_EVENT, openGallery);
  }, []);

  function closeGallery() {
    setIsOpen(false);
    setSelectedIndex(null);
  }

  function openImage(index: number) {
    setSelectedIndex(index);
    setIsOpen(true);
  }

  const selectedImage = selectedIndex != null ? images[selectedIndex] : null;

  return (
    <>
      <div className="gallery-strip" aria-label={label}>
        {images.slice(0, 3).map((image, index) => (
          <button
            key={`${image.src}-${image.version ?? "local"}`}
            type="button"
            className="gallery-image-button"
            onClick={() => openImage(index)}
            aria-label={`Open ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={1100}
              sizes="(max-width: 520px) 33vw, (max-width: 1040px) 100vw, 33vw"
            />
          </button>
        ))}
      </div>
      <div className="gallery-section__more">
        <button
          type="button"
          className="gallery-more-link"
          onClick={() => {
            setSelectedIndex(null);
            setIsOpen(true);
          }}
        >
          {moreLabel}
        </button>
      </div>

      {isOpen ? (
        <div className="gallery-overlay" role="dialog" aria-modal="true" onClick={closeGallery}>
          <div className="gallery-overlay__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-overlay__close"
              aria-label="Close gallery"
              onClick={closeGallery}
            >
              <X size={18} strokeWidth={2} />
            </button>
            {selectedImage ? (
              <div className="gallery-overlay__single">
                <button
                  type="button"
                  className="gallery-overlay__back"
                  onClick={() => setSelectedIndex(null)}
                >
                  Всички снимки
                </button>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1800}
                  height={2200}
                  sizes="(max-width: 1040px) 100vw, 82vw"
                  priority
                />
              </div>
            ) : (
              <div className="gallery-overlay__grid">
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-${image.version ?? "local"}-full`}
                    type="button"
                    className="gallery-overlay__thumb"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Open ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={1500}
                      sizes="(max-width: 520px) 100vw, (max-width: 1040px) 50vw, 33vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
