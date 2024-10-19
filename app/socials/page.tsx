import { SocialsComponent } from "@/components/pages/socials"
import { generateMeta } from '@/lib/generateMeta';
import { Metadata } from 'next';

export const metadata: Metadata = generateMeta({
    title: 'Socials',
	description: 'Find me on various social media platforms',
	path: '/socials',
});

// eslint-disable-next-line
export default function Socials() {
	return <SocialsComponent />
}
