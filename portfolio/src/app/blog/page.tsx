import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts } from '@/lib/api';

export default async function BlogPage() {
  const blg = await getBlogPosts();

  return (
    <main>
      <PageBanner
        label="♣ Blog"
        title="My Journal"
        description="Tempat aku berbagi catatan ngoding, riset robotika, dan cerita sehari-hari."
      />

      <section className="sec">
        <div className="wrap">
          <div className="bg">
            {blg.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

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
