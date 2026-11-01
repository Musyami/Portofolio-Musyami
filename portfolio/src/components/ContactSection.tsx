'use client';

import { useState } from 'react';
import FloatingSuits from './FloatingSuits';
import JokerForm from './JokerForm';
import { SOC } from '@/lib/fallback-data';

export default function ContactSection() {
  const [pos, setPos] = useState<number>(0);
  const n = SOC.length;

  const move = (step: number) => {
    setPos((prev) => (prev + step + n) % n);
  };

  return (
    <section id="contact" className="mv">
      <FloatingSuits count={8} />

      <div className="wrap">
        <div className="cg">
          <div className="cat">
            <h2 className="st">Sosial Media</h2>

            <div className="dk">
              {SOC.map((social, i) => {
                // Hitung offset relatif (-1, 0, 1, 2)
                const d = ((i - pos + 1 + n * 3) % n) - 1;
                const a = Math.abs(d);

                return (
                  <div
                    key={social.id}
                    className="face wh sw"
                    data-d={d}
                    data-a={a}
                    style={
                      {
                        color: social.color,
                        '--d': d,
                        '--a': a,
                      } as React.CSSProperties
                    }
                    onClick={() => {
                      if (d === 1 || d === -1) {
                        move(d);
                      }
                    }}
                  >
                    <span
                      className="cn"
                      dangerouslySetInnerHTML={{ __html: social.iconSvg || '' }}
                    />
                    <div
                      className="bg2"
                      dangerouslySetInnerHTML={{ __html: social.iconSvg || '' }}
                    />
                    <h3 style={{ color: '#1A1816' }}>{social.name}</h3>
                    <p>{social.handle}</p>
                    <a
                      className="bt"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (d !== 0) e.preventDefault();
                      }}
                    >
                      Buka
                    </a>
                    <span
                      className="cn b"
                      dangerouslySetInnerHTML={{ __html: social.iconSvg || '' }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="ar">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Kartu sebelumnya"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Kartu berikutnya"
              >
                ›
              </button>
            </div>
          </div>

          <JokerForm />
        </div>
      </div>
    </section>
  );
}
