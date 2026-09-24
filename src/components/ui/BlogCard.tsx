import Link from "next/link";
import { formatDate, type Post } from "@/data/blog";
import { Photo } from "@/components/ui/Photo";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col">
      <Link href={`/blog/${post.slug}`} className="group block">
        <Photo src={post.image} alt={post.imageAlt} className="aspect-[16/11]" sizes="(min-width: 1024px) 380px, 100vw" />
        <p className="mt-5 text-[12px] font-semibold tracking-[0.16em] text-nude">
          {post.category.toUpperCase()} · {formatDate(post.date)}
        </p>
        <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-brown group-hover:text-brown-soft">{post.title}</h3>
        <p className="mt-3 text-[15.5px] leading-[1.7] text-muted">{post.excerpt}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-brown">Pročitajte više</span>
      </Link>
    </article>
  );
}
