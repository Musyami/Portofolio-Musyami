'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FALLBACK_DATA } from '@/lib/fallback-data';

interface ProfileCardProps {
  showFull?: boolean;
}

function StatCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const startTime = performance.now();
            const duration = 1200;

            const step = (now: number) => {
              const p = Math.min(1, (now - startTime) / duration);
              // Cubic easing out
              const eased = 1 - Math.pow(1 - p, 3);
              setCount(Math.round(target * eased));

              if (p < 1) {
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={elementRef}>
      <b>{count}</b>
      <span>{label}</span>
    </div>
  );
}

export default function ProfileCard({ showFull = false }: ProfileCardProps) {
  const { profile, experience, projects, achievements } = FALLBACK_DATA;

  return (
    <div className="wrap">
      <div className="pf">
        <div className="cw">
          <div className="pcd">
            <div className="face wh pf1">
              <span className="cn">
                M<b>♠</b>
              </span>
              <div className="pho">
                <svg viewBox="0 0 100 120">
                  <circle cx="50" cy="44" r="20" fill="#a89f93" />
                  <path d="M10 120c0-30 18-46 40-46s40 16 40 46z" fill="#a89f93" />
                </svg>
              </div>
              <small>MUSYAMI</small>
              <span className="cn b">
                M<b>♠</b>
              </span>
            </div>
            <div className="pf2">
              <b>♠</b>
              <span>MUSYAMI</span>
            </div>
          </div>
        </div>

        <div>
          <p className="lb">♠ About Me</p>
          <h2 className="st">{profile.name}</h2>
          <p>{profile.about}</p>
        </div>
      </div>

      <div className="sts">
        <StatCounter target={experience.length} label="Total Pengalaman" />
        <StatCounter target={projects.length} label="Total Project" />
        <StatCounter target={achievements.length} label="Total Achievement" />
      </div>

      {!showFull && (
        <div className="mc">
          <Link href="/profile">
            <button type="button" className="bt p">
              Jelajahi lebih lanjut
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
