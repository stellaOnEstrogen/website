import { LinkComponent } from '@/components/pages/links';

type Params = {
	params: {
		name: string
	}
}

export default function Links({ params }: Params) {
	const { name } = params;
	return <LinkComponent name={name} /> 
}
