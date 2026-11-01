'use client';

import { useEffect, useRef } from 'react';
import { Skill, SkillCategoryGroup } from '@/lib/types';

interface SkillFanProps {
  groups: SkillCategoryGroup[];
}

function SingleFanCategory({ group }: { group: SkillCategoryGroup }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animTimeRef = useRef<number>(0);

  const isRed = group.suit === '♥' || group.suit === '♦';

  // Efek fan melengkung dan drag-to-scroll
  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;

    const cards = Array.from(sc.children) as HTMLElement[];

    const updateFan = () => {
      const center = sc.scrollLeft + sc.clientWidth / 2;
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const d = (cardCenter - center) / 108;
        const angle = Math.max(-32, Math.min(32, d * 7));
        const translateY = Math.min(d * d * 9, 110);
        card.style.transform = `translateY(${translateY}px) rotate(${angle}deg)`;
        card.style.zIndex = `${60 - Math.round(Math.abs(d) * 4)}`;
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateFan);
    };

    sc.addEventListener('scroll', handleScroll, { passive: true });

    // Inisialisasi ke posisi tengah
    sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
    updateFan();

    // Mouse drag scrolling
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        animTimeRef.current = 0;
        isDown = true;
        startX = e.clientX;
        startScrollLeft = sc.scrollLeft;
        sc.style.scrollSnapType = 'none';
        sc.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      sc.scrollLeft = startScrollLeft - (e.clientX - startX);
    };

    const onPointerUp = () => {
      if (isDown) {
        isDown = false;
        sc.style.scrollSnapType = '';
      }
    };

    sc.addEventListener('pointerdown', onPointerDown);
    sc.addEventListener('pointermove', onPointerMove);
    sc.addEventListener('pointerup', onPointerUp);
    sc.addEventListener('pointercancel', onPointerUp);

    return () => {
      sc.removeEventListener('scroll', handleScroll);
      sc.removeEventListener('pointerdown', onPointerDown);
      sc.removeEventListener('pointermove', onPointerMove);
      sc.removeEventListener('pointerup', onPointerUp);
      sc.removeEventListener('pointercancel', onPointerUp);
    };
  }, [group]);

  const slide = (direction: number) => {
    const sc = scrollRef.current;
    if (!sc) return;

    const dx = direction * 260;
    const s0 = sc.scrollLeft;
    const target = Math.max(0, Math.min(sc.scrollWidth - sc.clientWidth, s0 + dx));
    const t0 = performance.now();
    animTimeRef.current = t0;
    const duration = 1100;

    const ease = (p: number) =>
      p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    const frame = (n: number) => {
      if (animTimeRef.current !== t0) return;
      const p = Math.min(1, (n - t0) / duration);
      sc.scrollLeft = s0 + (target - s0) * ease(p);
      if (p < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  };

  const getAbbreviation = (name: string) => {
    const parts = name.split(' ');
    return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
  };

  return (
    <div className="cat">
      <h3>
        <span className={isRed ? 'rd' : ''}>{group.suit}</span> {group.category}
      </h3>

      <div className="sc" ref={scrollRef}>
        {group.skills.map((skill: Skill) => {
          const ab = getAbbreviation(skill.name);
          const firstChar = skill.name[0] || 'A';

          return (
            <div key={skill.id} className="sk">
              <div className="face cr">
                <div className={`cn ${isRed ? 'rd' : ''}`}>
                  {firstChar}
                  <b>{group.suit}</b>
                </div>

                <div className="lg">
                  <span>{ab}</span>
                  {skill.iconUrl && (
                    <img
                      src={skill.iconUrl}
                      alt={`Logo ${skill.name}`}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <b>{skill.name}</b>
                <em>{skill.description}</em>

                <div className="pbar">
                  <i style={{ width: `${skill.level}%` }} />
                </div>
                <u>{skill.level}%</u>

                <div className={`cn b ${isRed ? 'rd' : ''}`}>
                  {firstChar}
                  <b>{group.suit}</b>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ar">
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Geser kiri"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Geser kanan"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function SkillFan({ groups }: SkillFanProps) {
  return (
    <div>
      <p className="tip">Geser horizontal untuk melihat kartu lainnya</p>
      {groups.map((group) => (
        <SingleFanCategory key={group.category} group={group} />
      ))}
    </div>
  );
}
