import { Send as SendIcon } from "lucide-react";
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


export default async function LookBeforeMessaging() {
  const md = getMarkdownContent('pages', 'dm');

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
          <SendIcon className="h-8 w-8 mr-2 text-pink-400" />
          Message Me
        </h2>
          <p className="text-center text-sm mb-8">
           {/* eslint-disable-next-line react/no-unescaped-entities */}
          So you want to message me? That's great! But before you do, please read this page to understand how to message me and what to expect.
          </p>

          <div className={`prose prose-pink max-w-none mb-6 ${markdownStyles["markdown"]}`} dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateMetadata(): Metadata {

  return {
    title: `${config.name} | Look Before Messaging`,
    openGraph: {
      title: `${config.name} | Look Before Messaging`,
      description: "This is a page that explains the importance of messaging me and how to do it.",
    },
  };
}
