"use client";

import { useState } from "react";
import type { StaffMember } from "./staff";

function StaffAvatar({ member }: { member: StaffMember }) {
  return (
    <span className="team-avatar">
      {member.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={member.avatarUrl} alt={member.name} />
      ) : (
        <span>{member.name.charAt(0)}</span>
      )}
    </span>
  );
}

export function TeamSection({
  staffMembers,
  locale
}: {
  staffMembers: StaffMember[];
  locale: "bg" | "en";
}) {
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const isBg = locale === "bg";

  return (
    <section id="team" className="team-section">
      <div className="section-copy section-copy--center team-section__copy">
        <h2>{isBg ? "Нашият екип" : "Our team"}</h2>
        <p>
          {isBg
            ? "Всяка тренировка се води от инструктор с внимание към техника, темпо и индивидуално усещане за тялото."
            : "Each class is guided with attention to technique, pacing, and the individual feel of the body."}
        </p>
      </div>
      <div className="team-grid">
        {staffMembers.map((member) => (
          <article className="team-card" key={member.id || member.slug}>
            <button
              type="button"
              className="team-card__avatar-link"
              aria-label={isBg ? `Виж био на ${member.name}` : `View ${member.name} bio`}
              onClick={() => setSelectedMember(member)}
            >
              <StaffAvatar member={member} />
            </button>
            <button
              type="button"
              className="team-card__content team-card__content-button"
              onClick={() => setSelectedMember(member)}
            >
              <h3>{member.name}</h3>
              <p className="team-card__role">{isBg ? "Инструктор" : "Instructor"}</p>
            </button>
          </article>
        ))}
      </div>

      {selectedMember ? (
        <div
          className="team-bio-modal"
          role="dialog"
          aria-modal="true"
          aria-label={isBg ? `Био на ${selectedMember.name}` : `${selectedMember.name} bio`}
          onClick={() => setSelectedMember(null)}
        >
          <div className="team-bio-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="team-bio-modal__close"
              aria-label={isBg ? "Затвори" : "Close"}
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>
            <StaffAvatar member={selectedMember} />
            <h3>{selectedMember.name}</h3>
            <p className="team-bio-modal__role">{isBg ? "Инструктор" : "Instructor"}</p>
            <p className="team-bio-modal__bio">
              {selectedMember.bio?.trim() ||
                (isBg
                  ? "Скоро ще добавим кратко био за тази треньорка."
                  : "A short instructor bio will be added soon.")}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
