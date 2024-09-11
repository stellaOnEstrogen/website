import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ChevronLeft,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  getAllBlogPosts,
  getBlogPost,
  formatDate,
  generateBlogTimetoRead,
} from "@/lib/blog";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import markdownStyles from "./markdown-styles.module.css";
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import { Metadata } from "next";
import { config } from "@/config";

type Params = {
  params: {
    slug: string;
  };
};

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .process(markdown);

  const htmlContent = result.toString();


  const highlightedContent = htmlContent.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, language, code) => {
      const highlightedCode = hljs.highlight(code, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`;
    }
  );

  return highlightedContent;
}

export default async function BlogPost({ params }: Params) {
  const post = getBlogPost(params.slug);


  if (!post) {
    return (
      <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto">
          <p>Post not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const content = await markdownToHtml(post.content);

  

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />

      <main className="flex-grow p-8 max-w-4xl mx-auto">
        <Link href="/blog">
          <Button className="mb-6 bg-pink-300 hover:bg-pink-400 text-white">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white p-8 rounded-lg shadow-md border-2 border-pink-200">
          <h2 className="text-3xl font-semibold mb-4 text-pink-600">
            {post.metadata.title}
          </h2>

          <div className="flex items-center mb-6 text-pink-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">
              {formatDate(post.metadata.publishedAt)}
            </span>
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">
              {generateBlogTimetoRead(post.content)} min read
            </span>
          </div>

          {post.metadata.image && (
            // <img
            //   src={post.metadata.image}
            //   alt={`Image for ${post.metadata.title}`}
            //   className="w-full h-64 object-cover rounded-lg mb-6"
            // />
            <figure className="mb-6">
              <img
                src={post.metadata.image}
                alt={`Image for ${post.metadata.title}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <figcaption className="text-sm text-gray-500 text-center">
                {post.metadata.imageCaption}
              </figcaption>
            </figure>
          )}

          <div
            className={`"prose prose-pink max-w-none mb-6" ${markdownStyles["markdown"]}`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}


export function generateMetadata({ params }: Params): Metadata {

  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const image = post.metadata.image || config.avatar;

  return {
    title: `${config.name} | Blog | ${post.metadata.title}`,
    openGraph: {
      title: `${config.name} | Blog | ${post.metadata.title}`,
      description: post.metadata.summary,
      images: [
        {
          url: image,
          alt: post.metadata.title
        },
      ],
    },
  };
}

