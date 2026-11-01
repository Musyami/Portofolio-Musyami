import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import TimelineSection from '@/components/TimelineSection';
import { getExperience } from '@/lib/api';

export default async function ExperiencePage() {
  const exp = await getExperience();

  return (
    <main>
      <PageBanner
        label="♣ Experience"
        title="My Experience"
        description="Ini jejak organisasi, kepemimpinan, dan magang yang sudah aku jalani. Yuk, lihat satu per satu!"
      />

      <section className="sec">
        <div className="wrap">
          <TimelineSection
            items={exp.map((e) => ({
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
            full={true}
          />

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
