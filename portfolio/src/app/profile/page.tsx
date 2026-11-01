import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ProfileCard from '@/components/ProfileCard';
import TimelineSection from '@/components/TimelineSection';
import { getEducation } from '@/lib/api';

export default async function ProfilePage() {
  const edu = await getEducation();

  return (
    <main>
      <PageBanner
        label="♠ Profil"
        title="Tentang Musyami"
        description="Kenalan lebih dekat."
      />

      <section className="sec mv">
        <ProfileCard showFull={true} />

        {/* Bagian Pendidikan (Education) */}
        <div className="wrap" style={{ marginTop: '80px' }}>
          <p className="lb">♠ Pendidikan</p>
          <h2 className="st">Education</h2>
          <p className="sd">Perjalanan belajarku dari bangku sekolah sampai perguruan tinggi.</p>

          <TimelineSection
            items={edu.map((e, idx) => ({
              id: e.id,
              order: e.order,
              title: e.title,
              subtitle: e.major,
              period: e.period,
              description: e.description,
              rank: ['A', 'K', 'Q'][idx % 3],
              suit: '♠',
            }))}
            full={true}
            noImage={true}
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
