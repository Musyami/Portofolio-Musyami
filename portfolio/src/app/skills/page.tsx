import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import SkillFan from '@/components/SkillFan';
import { getSkills } from '@/lib/api';
import type { SkillCategoryGroup } from '@/lib/types';

// Helper: kelompokkan skills ke SkillCategoryGroup[]
function groupSkills(skills: import('@/lib/types').Skill[]): SkillCategoryGroup[] {
  const map = new Map<string, SkillCategoryGroup>();
  for (const s of skills) {
    if (!map.has(s.category)) {
      map.set(s.category, { category: s.category, suit: s.suit ?? '♠', skills: [] });
    }
    map.get(s.category)!.skills.push(s);
  }
  return Array.from(map.values());
}

export default async function SkillsPage() {
  const skills = await getSkills();
  const skillGroups = groupSkills(skills);

  return (
    <main>
      <PageBanner
        label="♦ Skills"
        title="My Skills"
        description="Geser kartunya dan lihat tech stack serta peralatan yang aku kuasai."
      />

      <section className="sec">
        <div className="wrap">
          <SkillFan groups={skillGroups} />

          <div className="mc">
            <Link href="/">
              <button type="button" className="bt p">
                Kembali ke Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
