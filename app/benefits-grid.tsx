"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

type BenefitItem = {
  id: string;
  title: string;
  text: string;
};

export function BenefitsGrid({ items }: { items: BenefitItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeBenefit = items.find((item) => item.id === activeId) ?? null;

  return (
    <>
      <div className="benefit-stories">
        {items.map((benefit) => (
          <button
            key={benefit.id}
            type="button"
            className="benefit-story"
            onClick={() => setActiveId(benefit.id)}
          >
            <span className="benefit-story__icon" aria-hidden="true">
              <Check size={15} strokeWidth={2.5} />
            </span>
            <h3>{benefit.title}</h3>
          </button>
        ))}
      </div>

      {activeBenefit ? (
        <div
          className="benefit-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`benefit-title-${activeBenefit.id}`}
          onClick={() => setActiveId(null)}
        >
          <div className="benefit-overlay__card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="benefit-overlay__close"
              aria-label="Затвори"
              onClick={() => setActiveId(null)}
            >
              <X size={18} strokeWidth={2} />
            </button>
            <div className="benefit-overlay__header">
              <span className="benefit-story__icon benefit-story__icon--modal" aria-hidden="true">
                <Check size={16} strokeWidth={2.5} />
              </span>
              <h3 id={`benefit-title-${activeBenefit.id}`}>{activeBenefit.title}</h3>
            </div>
            <p>{activeBenefit.text}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
