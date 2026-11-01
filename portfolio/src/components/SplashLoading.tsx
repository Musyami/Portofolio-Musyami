'use client';

import { useState, useEffect } from 'react';

const MESSAGES = [
  'Mengocok kartu...',
  'Membagikan kartu...',
  'Menata meja...',
  'Siap bermain!',
];

export default function SplashLoading() {
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>(MESSAGES[0]);
  const [isOut, setIsOut] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  useEffect(() => {
    // Cek apakah splash sudah pernah muncul di sesi ini
    if (typeof window === 'undefined') return;
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setIsRemoved(true);
      return;
    }

    document.body.classList.add('ld');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 300 : 2500;
    const startTime = performance.now();
    let animFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(1, elapsed / duration);
      // Easing out quadratic
      const eased = 1 - Math.pow(1 - p, 2);

      const percent = Math.round(eased * 100);
      setProgress(percent);
      const msgIndex = Math.min(3, Math.floor(p * 4));
      setMessage(MESSAGES[msgIndex]);

      if (p < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setIsOut(true);
        document.body.classList.remove('ld');
        sessionStorage.setItem('hasSeenSplash', 'true');
        setTimeout(() => {
          setIsRemoved(true);
        }, 800);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.classList.remove('ld');
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="sp"
      role="status"
      aria-label="Memuat"
      className={isOut ? 'out' : ''}
    >
      <div className="spw">
        <div className="spc">
          <div className="spf">
            <em>A</em>♠
          </div>
          <div className="spb">♠</div>
        </div>
      </div>
      <p className="spt" id="spt">
        {message}
      </p>
      <div className="spbar">
        <i id="spb" style={{ width: `${progress}%` }} />
      </div>
      <div className="spm">
        <span>Loading</span>
        <span id="spp">{progress}%</span>
      </div>
      <div className="sps">
        <i>♠</i>
        <i>♥</i>
        <i>♦</i>
        <i>♣</i>
      </div>
    </div>
  );
}
