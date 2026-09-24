import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { posts } from "@/data/blog";
import { BlogCard } from "@/components/ui/BlogCard";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "Saveti za mirnije roditeljstvo: izbor dadilje, prvi susret i dogovor pre početka angažovanja.",
  path: "/blog",
});

export default function BlogPage() {
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
      <h1 className="font-serif text-5xl text-brown sm:text-6xl">Saveti za mirnije roditeljstvo</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
        {ordered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
