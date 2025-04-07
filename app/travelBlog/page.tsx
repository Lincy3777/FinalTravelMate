import { getBlogPosts } from "./data";
import BlogCard from "@/app/components/BlogCard";

export default function TravelBlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800"> Explore the World</h1>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Discover fascinating destinations and get inspired to travel!
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            image={post.image}
            summary={post.summary}
          />
        ))}
      </section>
    </main>
  );
}
