import { CircleUser as UserIcon } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { config } from "@/config";
import { Metadata } from "next";
import markdownStyles from "./markdown-styles.module.css";
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import { getMarkdownContent } from "@/lib/md";
import { remark } from "remark";
import html from "remark-html";

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


export default async function About() {
  const md = getMarkdownContent('pages', 'about');

    if (!md) {
    return (
      <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto">
          <p>This file has either been moved or deleted. Please check back later!</p>
        </main>
        <Footer />
      </div>
    );
  }

  const content = await markdownToHtml(md.content);

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <UserIcon className="h-8 w-8 mr-2 text-pink-400" />
          Learn about me
        </h2>
          <div className={`prose prose-pink max-w-none mb-6 ${markdownStyles["markdown"]}`} dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateMetadata(): Metadata {

  return {
    title: `${config.name} | About Me`,
    openGraph: {
      title: `${config.name} | About me`,
      description: "Learn more about me and who I am as a person.",
    },
  };
}
