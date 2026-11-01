'use client';

import { useEffect, useRef, useState } from 'react';
import FloatingSuits from './FloatingSuits';

interface HeroCardData {
  rank: string;
  suit: string;
  isRed: boolean;
}

const HERO_CARDS: HeroCardData[] = [
  { rank: 'A', suit: '♠', isRed: false },
  { rank: 'K', suit: '♥', isRed: true },
  { rank: 'Q', suit: '♦', isRed: true },
  { rank: 'J', suit: '♣', isRed: false },
  { rank: '10', suit: '♠', isRed: false },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const fcRef = useRef<HTMLDivElement>(null);
  const [cardClasses, setCardClasses] = useState<string[]>(HERO_CARDS.map(() => ''));

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    // Jika splash loading baru jalan, beri jeda sebelum deal kartu
    const baseDelay = hasSeenSplash ? 100 : 2600;

    const timers: NodeJS.Timeout[] = [];

    HERO_CARDS.forEach((_, i) => {
      const schedule = (callback: () => void, delayMs: number) => {
        const t = setTimeout(callback, isReducedMotion ? 0 : delayMs + baseDelay);
        timers.push(t);
      };

      // 1. Tumpuk (stk)
      schedule(() => {
        setCardClasses((prev) => {
          const next = [...prev];
          next[i] = 'stk';
          return next;
        });
      }, 150 + i * 140);

      // 2. Kipas (fan)
      schedule(() => {
        setCardClasses((prev) => {
          const next = [...prev];
          next[i] = 'fan';
          return next;
        });
      }, 1300 + i * 110);

      // 3. Balik menghadap ke atas (fan up)
      schedule(() => {
        setCardClasses((prev) => {
          const next = [...prev];
          next[i] = 'fan up';
          return next;
        });
      }, 2300 + i * 160);
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!fcRef.current) return;
      const rect = fcRef.current.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
      const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
      fcRef.current.style.transform = `rotateX(${-yRatio * 8}deg) rotateY(${xRatio * 10}deg)`;
    };

    const handleMouseLeave = () => {
      if (!fcRef.current) return;
      fcRef.current.style.transform = '';
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      timers.forEach(clearTimeout);
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    setCardClasses((prev) => {
      const next = [...prev];
      const current = next[index] || '';
      if (current.includes('up')) {
        next[index] = current.replace('up', '').trim();
      } else {
        next[index] = `${current} up`.trim();
      }
      return next;
    });
  };

  const handleScrollToProfile = () => {
    const profileEl = document.getElementById('profil');
    if (profileEl) {
      profileEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="mv" ref={heroRef}>
      <FloatingSuits count={18} />
      <i className="ring" />

      <div
        className="fc"
        id="fc"
        ref={fcRef}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      >
        {HERO_CARDS.map((card, i) => (
          <div
            key={i}
            className={`hk ${cardClasses[i]}`}
            style={
              {
                '--i': i,
                '--m': i - 2,
              } as React.CSSProperties
            }
            onClick={() => handleCardClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Kartu ${card.rank} ${card.suit}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(i);
              }
            }}
          >
            <div className="hi">
              <div className={`face cr hf ${i === 0 ? 'ace' : ''}`}>
                <div className={`cn ${card.isRed ? 'rd' : ''}`}>
                  {card.rank}
                  <b>{card.suit}</b>
                </div>
                <div className={`big ${card.isRed ? 'rd' : 'gd'}`}>{card.suit}</div>
                <div className={`cn b ${card.isRed ? 'rd' : ''}`}>
                  {card.rank}
                  <b>{card.suit}</b>
                </div>
              </div>
              <div className="hb">{card.suit}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="hint">Klik kartu untuk membaliknya</p>
      <button
        type="button"
        className="bt p"
        onClick={handleScrollToProfile}
      >
        JELAJAHI
      </button>
    </section>
  );
}
