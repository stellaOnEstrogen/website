import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Flower } from "lucide-react";
import { formatDate, getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Metadata } from "next";
import { config } from "@/config";

function truncateSummary(content: string) {
  return content.length > 200 ? content.slice(0, 200).trimEnd() + "..." : content;
}

export default function Blog() {
  const blogs = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />

      <main className="flex-grow p-8 flex">
        <div className="w-3/4 pr-8">
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <Flower className="h-6 w-6 mr-2 text-pink-400" />
            Latest Posts
          </h2>

          {blogs.length ? (
            blogs.map((post) => (
              <article key={post.slug} className="mb-8 bg-white p-6 rounded-lg shadow-md border-2 border-pink-200">
                <h3 className="text-2xl font-semibold mb-2 text-pink-600">{post.metadata.title}</h3>
                <p className="text-sm text-pink-400 mb-2">{formatDate(post.metadata.publishedAt)}</p>
                <p className="text-pink-700 mb-4">{truncateSummary(post.content)}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-white">Read More</Button>
                </Link>
              </article>
            ))
          ) : (
            <p>No blog posts available</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function generateMetadata(): Metadata {

  return {
    title: `${config.name} | Blog`,
    openGraph: {
      title: `${config.name} | Blog`,
      description: "Read the latest blog posts.",
    },
  };
}

