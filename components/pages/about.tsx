'use client'

import Layout from '../Layout'
import { Content } from '@/components/content'
import { useContent } from '@/hooks/useContent'

// eslint-disable-next-line
export function AboutComponent(): JSX.Element {
  const { content, error, loading } = useContent('pages/about.md')
  
	return (
		<Layout>
			<div className="space-y-4">
				<h2 className="text-center text-2xl font-bold text-pink-600">
					About Me (^・ω・^)
				</h2>
				{
          loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">Error: {error}</p>
          ) : (
            <Content content={content} className='text-sm' />
          )
        }
			</div>
		</Layout>
	)
}
