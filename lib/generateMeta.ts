import { Metadata } from "next";
import { config } from "@/config";

type Meta = {
    title: string;
    path?: string;
    description?: string;
    image?: string;
};

export function generateMeta(meta: Meta): Metadata {
    const baseUrl = config.url;
    const defaultDescription = config.about;
    const defaultImage = `${baseUrl}/assets/images/cover.jpg`; // Fallback image if meta.image is not provided

    return {
        title: `${meta.title} | ${config.name}`,
        description: meta.description || defaultDescription,
        authors: [
            {
                name: config.name,
                url: `${baseUrl}/about`,
            },
        ],
        openGraph: {
            title: `${meta.title} | ${config.name}`,
            description: meta.description || defaultDescription,
            url: `${baseUrl}${meta.path}`,
            type: "website",
            locale: "en_US",
            siteName: config.name,
            images: [
                {
                    url: meta.image ? `${baseUrl}${meta.image}` : defaultImage,
                    width: 1200,
                    height: 630,
                    alt: meta.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${meta.title} | ${config.name}`,
            description: meta.description || defaultDescription,
            images: [meta.image ? `${baseUrl}${meta.image}` : defaultImage],
        },
        keywords: require("../content/misc/seo/keywords.json"),
        robots: "index, follow",
        generator: "Next.js",
    };
}
