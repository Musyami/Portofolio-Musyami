'use client';

import { useState } from 'react';
import { Project } from '@/lib/types';
import ProjectFlipCard from './ProjectFlipCard';

interface ProjectSectionProps {
  projects: Project[];
  limit?: number;
  showFilter?: boolean;
}

const CATEGORIES = ['Semua', 'Web', 'Robotik', 'Desain', 'UI/UX'];

export default function ProjectSection({
  projects,
  limit,
  showFilter = true,
}: ProjectSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'Semua') return true;
    return p.category === selectedCategory;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div>
      {showFilter && (
        <div className="fl2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? 'on' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="tb">
        <div className="pg">
          {displayedProjects.map((project, index) => (
            <ProjectFlipCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
