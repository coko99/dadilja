import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/data/blog";
import { site } from "@/data/site";
import { Photo } from "@/components/ui/Photo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: new URL(`/blog/${post.slug}`, site.url).toString() },
    openGraph: { type: "article", images: [post.image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    image: new URL(post.image, site.url).toString(),
    author: { "@type": "Organization", name: site.name },
    description: post.excerpt,
  };
  return (
    <article className="mx-auto max-w-[820px] px-5 py-14 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="text-[12px] font-semibold tracking-[0.16em] text-nude">
        {post.category.toUpperCase()} · {formatDate(post.date)}
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-tight text-brown">{post.title}</h1>
      <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
      <Photo src={post.image} alt={post.imageAlt} className="mt-8 aspect-[16/10]" priority sizes="820px" />
      <div className="mt-10 space-y-5 text-[18px] leading-[1.8] text-ink/90">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
