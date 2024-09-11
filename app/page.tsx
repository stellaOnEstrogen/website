import {
  Flower,
  Cat,
  Music,
  Mail,
  Github, Instagram, Facebook, Twitter, Twitch, Youtube
} from "lucide-react";
import Header from "@/components/header";
import { config } from "@/config";
import { formatDate, getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

function truncateSummary(content: string) {
  return content.slice(0, 200).trimEnd();
}

export default function Home() {
  const allBlogs = getBlogPosts(5, 1);
  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <section id="blog" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Flower className="h-6 w-6 mr-2 text-pink-400" />
            Blog
          </h2>
          <div className="grid gap-4">
            {allBlogs.map((blog) => (
              <div
                key={blog.slug}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {blog.metadata.title}
                </h3>
                <p className="text-pink-700">
                  {truncateSummary(blog.metadata.summary)}
                </p>
                <p className="text-sm text-pink-600 mt-2">
                  {formatDate(blog.metadata.publishedAt, true)}
                </p>
                <Link href={`/blog/${blog.slug}`}>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-white mt-2">
                    Read More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Cat className="h-6 w-6 mr-2 text-pink-400" />
            About Me
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-pink-700 mb-4">{config.about}</p>
          </div>
        </section>

        <section id="socials" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Music className="h-6 w-6 mr-2 text-pink-400" />
            Socials
          </h2>
          <div className="flex space-x-4">
            <a
              href={config.contact.email}
              className="text-pink-600 hover:text-pink-700 flex items-center"
            >
              <Mail className="h-5 w-5 mr-1" />
              Email
            </a>
            {config.socials && config.socials.map((social) => {
              if (social.name.toLowerCase() === 'twitter') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Twitter className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else if (social.name.toLowerCase() === 'github') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Github className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else if (social.name.toLowerCase() === 'instagram') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Instagram className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else if (social.name.toLowerCase() === 'facebook') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Facebook className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else if (social.name.toLowerCase() === 'twitch') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Twitch className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else if (social.name.toLowerCase() === 'youtube') {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    <Youtube className="h-5 w-5 mr-1" />
                    {social.name}
                  </a>
                );
              } else {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-pink-600 hover:text-pink-700 flex items-center"
                  >
                    {social.name}
                  </a>
                );
              }

            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
