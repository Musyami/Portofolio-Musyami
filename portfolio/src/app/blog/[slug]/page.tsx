import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import { getBlogPosts, getBlogBySlug } from '@/lib/api';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <PageBanner
        label="♣ Blog"
        title="Baca Cerita"
        description=""
      />

      <section className="sec">
        <div className="wrap">
          <article className="art">
            <div
              className="ph"
              role="img"
              aria-label={`Gambar ${post.title}`}
            >
              {post.coverUrl ? (
                <img src={post.coverUrl} alt={post.title} />
              ) : (
                post.emoji || '🤖'
              )}
            </div>

            <time>{post.date}</time>
            <h1>{post.title}</h1>

            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="mc" style={{ marginTop: '36px' }}>
              <Link href="/blog">
                <button type="button" className="bt p">
                  Kembali ke Blog
                </button>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
