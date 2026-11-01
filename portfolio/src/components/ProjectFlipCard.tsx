'use client';

import { useRef, useState } from 'react';
import { Project } from '@/lib/types';

interface ProjectFlipCardProps {
  project: Project;
  index: number;
}

export default function ProjectFlipCard({ project, index }: ProjectFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const isRed = project.suit === '♥' || project.suit === '♦';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxDegree = 14;
    innerRef.current.style.transform = `rotateX(${-y * maxDegree}deg) rotateY(${x * maxDegree}deg)`;
  };

  const handleMouseLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = '';
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`pc deal in ${isFlipped ? 'fl' : ''}`}
      style={{ '--i': index } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tl3" ref={innerRef}>
        <div
          className="fi"
          role="button"
          tabIndex={0}
          aria-label={`Balik kartu ${project.title}`}
          onClick={toggleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFlip();
            }
          }}
        >
          {/* Sisi Depan Kartu */}
          <div className="face cr fa">
            <div className={`cn ${isRed ? 'rd' : ''}`}>
              {project.rank || 'A'}
              <b>{project.suit || '♠'}</b>
            </div>

            <span className="ct">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="tgs">
              {project.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>

            <span className="hn">Klik untuk membalik</span>

            <div className={`cn b ${isRed ? 'rd' : ''}`}>
              {project.rank || 'A'}
              <b>{project.suit || '♠'}</b>
            </div>
          </div>

          {/* Sisi Belakang Kartu (Case Study) */}
          <div className="face fb">
            <h3>Case Study</h3>
            <p>{project.caseStudy}</p>
            {project.buttons && project.buttons.length > 0 ? (
              <a
                href={project.buttons[0].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {project.buttons[0].label}
              </a>
            ) : (
              <a
                href="https://github.com/Musyami"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Lihat di GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
