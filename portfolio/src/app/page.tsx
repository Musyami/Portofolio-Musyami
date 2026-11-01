import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProfileCard from '@/components/ProfileCard';
import TimelineSection from '@/components/TimelineSection';
import SkillFan from '@/components/SkillFan';
import ProjectSection from '@/components/ProjectSection';
import BlogCard from '@/components/BlogCard';
import ContactSection from '@/components/ContactSection';
import { getExperience, getAchievements, getSkills, getProjects, getBlogPosts } from '@/lib/api';
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

export default async function HomePage() {
  // Ambil data dari API (atau fallback otomatis)
  const [exp, achv, skills, prj, blg] = await Promise.all([
    getExperience(),
    getAchievements(),
    getSkills(),
    getProjects(),
    getBlogPosts(),
  ]);

  const skillGroups = groupSkills(skills);

  return (
    <main>
      {/* Hero Deck */}
      <HeroSection />

      {/* Profil Singkat */}
      <section className="sec mv" id="profil">
        <ProfileCard showFull={false} />
      </section>

      {/* Experience Singkat (5 item teratas) */}
      <section className="sec">
        <div className="wrap">
          <p className="lb">♣ Part 02</p>
          <h2 className="st">Experience</h2>
          <p className="sd">
            Ini perjalanan dan pengalamanku. Yuk, intip apa saja yang sudah aku jalani!
          </p>

          <TimelineSection
            items={exp.slice(0, 5).map((e) => ({
              id: e.id,
              order: e.order,
              title: e.title,
              subtitle: e.organization,
              period: e.period,
              description: e.description,
              bullets: e.bullets,
              emoji: e.emoji,
              imageUrl: e.imageUrl,
              rank: e.rank,
              suit: e.suit,
              isCurrent: e.isCurrent,
            }))}
            full={false}
          />

          <div className="mc">
            <Link href="/experience">
              <button type="button" className="bt p">
                Jelajahi lebih lanjut
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Singkat */}
      <section className="sec">
        <div className="wrap">
          <p className="lb">♦ Part 03</p>
          <h2 className="st">Skills</h2>
          <p className="sd">
            Ini skill yang terus aku asah. Geser kartunya dan lihat seberapa jauh aku menguasainya!
          </p>

          <SkillFan groups={skillGroups} />

          <div className="mc">
            <Link href="/skills">
              <button type="button" className="bt p">
                Jelajahi lebih lanjut
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Singkat (8 kartu teratas) */}
      <section className="sec">
        <div className="wrap">
          <p className="lb">♥ Part 04</p>
          <h2 className="st">Projects</h2>
          <p className="sd">
            Yuk, intip project yang sudah aku bangun! Pilih kategori, lalu klik kartunya untuk melihat ceritanya.
          </p>

          <ProjectSection projects={prj} limit={8} showFilter={false} />

          <div className="mc">
            <Link href="/projects">
              <button type="button" className="bt p">
                Jelajahi lebih lanjut
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievement Singkat (3 teratas) */}
      <section className="sec">
        <div className="wrap">
          <p className="lb">♠ Part 05</p>
          <h2 className="st">Achievement</h2>
          <p className="sd">
            Beberapa pencapaian yang bikin aku bangga. Yuk, lihat apa saja!
          </p>

          <TimelineSection
            items={achv.slice(0, 3).map((a) => ({
              id: a.id,
              order: a.order,
              title: a.title,
              subtitle: a.organizer,
              period: a.date,
              description: a.description,
              bullets: a.bullets,
              emoji: a.emoji,
              imageUrl: a.imageUrl,
              rank: a.rank,
              suit: a.suit,
            }))}
            full={false}
          />

          <div className="mc">
            <Link href="/achievement">
              <button type="button" className="bt p">
                Jelajahi lebih lanjut
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Singkat (3 artikel teratas) */}
      <section className="sec">
        <div className="wrap">
          <p className="lb">♣ Part 06</p>
          <h2 className="st">Blog</h2>
          <p className="sd">Cerita dan catatan dari perjalananku.</p>

          <div className="bg">
            {blg.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <div className="mc">
            <Link href="/blog">
              <button type="button" className="bt p">
                Jelajahi lebih lanjut
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Kontak & Kartu Joker */}
      <ContactSection />
    </main>
  );
}
