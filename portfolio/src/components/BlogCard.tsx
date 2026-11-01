import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <article
      className="nt deal in"
      style={{ '--i': index } as React.CSSProperties}
    >
      <div>
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
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <button type="button" className="bt">
            Baca selengkapnya
          </button>
        </Link>
      </div>
    </article>
  );
}
