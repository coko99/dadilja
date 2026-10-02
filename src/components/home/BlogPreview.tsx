import { latestPosts } from "@/data/blog";
import { BlogCard } from "@/components/ui/BlogCard";

export function BlogPreview() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
      <h2 className="font-serif text-5xl text-brown sm:text-6xl">Saveti za mirnije roditeljstvo</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latestPosts(3).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
