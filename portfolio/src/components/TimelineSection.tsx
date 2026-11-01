'use client';

import { useEffect, useRef } from 'react';

export interface TimelineItem {
  id: string;
  order: number;
  title: string;
  subtitle?: string; // organization / major / organizer
  period?: string;
  description?: string;
  bullets?: string[];
  emoji?: string;
  imageUrl?: string;
  rank?: string;
  suit?: string;
  isCurrent?: boolean;
}

interface TimelineSectionProps {
  items: TimelineItem[];
  full?: boolean;
  noImage?: boolean;
}

export default function TimelineSection({
  items,
  full = false,
  noImage = false,
}: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.deal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  const isRed = (suit?: string) => suit === '♥' || suit === '♦';

  return (
    <div className="tm" ref={containerRef}>
      {items.map((item, i) => {
        const suit = item.suit || '♠';
        const rank = item.rank || 'A';
        const redClass = isRed(suit) ? 'rd' : '';

        return (
          <div
            key={item.id}
            className="ex deal"
            style={{ '--i': i } as React.CSSProperties}
          >
            <div className={`rk ${redClass}`}>
              {rank}
              <small>{suit}</small>
            </div>

            <div className="face ec">
              {!noImage && (
                <div
                  className={`ph ${full ? '' : 'sm'}`}
                  role="img"
                  aria-label={`Foto ${item.title}`}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    item.emoji || '♠'
                  )}
                </div>
              )}

              <h3>
                {item.title}
                {item.isCurrent && <span className="ch">Sekarang</span>}
              </h3>

              <p className="r">
                {[item.subtitle, item.period].filter(Boolean).join(' · ')}
              </p>

              {item.description && <p>{item.description}</p>}

              {full && item.bullets && item.bullets.length > 0 && (
                <ul>
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
