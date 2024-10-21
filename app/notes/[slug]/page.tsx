import { NotesComponent } from '@/components/pages/notes'

type Params = {
	params: {
		slug: string
	}
}

// eslint-disable-next-line
export default function NotesIndex({ params }: Params) {
	const { slug } = params

	return <NotesComponent slug={slug} />
}
