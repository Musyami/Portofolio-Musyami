import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import TimelineSection from '@/components/TimelineSection';
import { getAchievements } from '@/lib/api';

export default async function AchievementPage() {
  const achv = await getAchievements();

  return (
    <main>
      <PageBanner
        label="♠ Achievement"
        title="My Achievements"
        description="Pencapaian dan penghargaan yang pernah aku raih. Yuk, intip satu per satu!"
      />

      <section className="sec">
        <div className="wrap">
          <TimelineSection
            items={achv.map((a) => ({
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
