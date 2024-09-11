import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { config } from "@/config";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

interface MediaItem {
  Id: string;
  Caption: string;
  FileName: string;
  ContentType: string;
  Views: number;
  UploadedAt: number;
  UploadedBy: string;
}

interface Image {
  src: string;
  alt: string;
  url: string;
}


export default async function Gallery() {
  const { enabled, url } = config.components.images;

  if (!enabled) {
    return (
      <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
        <Header />
        <main className="flex-grow p-8">
          <p className="text-center text-xl">
            Gallery is currently disabled. Please enable it in the configuration file.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (enabled && !url) {
    return (
      <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
        <Header />
        <main className="flex-grow p-8">
          <p className="text-center text-xl">
            Gallery is enabled but no URL is provided. Please add a URL in the configuration file.
          </p>
          <Link href="https://github.com/stellaOnEstrogen/image-uploader">
            <Button className="mt-4">View Documentation</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const imagesResponse = await fetch(
    `${url}/api/get-media?by=1&sort=DESC&order=UploadedAt`,
    { headers: { "Content-Type": "application/json" } }
  );
  const imagesData = await imagesResponse.json();

  const images = imagesData
    .filter((image: MediaItem) => image.ContentType.includes("image"))
    .map((image: MediaItem) => ({
      src: `${url}/view/${image.Id}?raw=true`,
      alt: image.Caption,
      url: `${url}/view/${image.Id}`,
    }));

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <ImageIcon className="h-8 w-8 mr-2 text-pink-400" />
          Gallery
        </h2>
        <p className="text-center text-lg mb-8">
          These images are fetched from the image uploader API.{" "}
          <Link href="https://github.com/stellaOnEstrogen/image-uploader" className="text-pink-400 underline">
            View Documentation
          </Link>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image: Image, index: number) => (
            <div key={index} className="relative group">
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={image.url}>
                  <Button className="bg-pink-400 hover:bg-pink-500 text-white">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateMetadata(): Metadata {

  return {
    title: `${config.name} | Gallery`,
    openGraph: {
      title: `${config.name} | Gallery`,
      description: "View images from the gallery.",
    },
  };
}
