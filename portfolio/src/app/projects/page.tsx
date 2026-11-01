import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ProjectSection from '@/components/ProjectSection';
import { getProjects } from '@/lib/api';

export default async function ProjectsPage() {
  const prj = await getProjects();

  return (
    <main>
      <PageBanner
        label="♥ Projects"
        title="My Projects"
        description="Karya-karya yang aku bangun, dibagi per kategori: Web, Robotik, Desain, dan UI/UX."
      />

      <section className="sec">
        <div className="wrap">
          <ProjectSection projects={prj} showFilter={true} />

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
