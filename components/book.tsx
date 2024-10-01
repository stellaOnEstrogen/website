import React from 'react'
import { motion } from 'framer-motion'

interface BookProps {
	title: string
	content: string
	isLight: boolean
	contentClassNames?: string
	children?: React.ReactNode
}

interface BookTitleProps {
	children: React.ReactNode
	isLight: boolean
}

interface BookContentProps {
	children: React.ReactNode
	isLight: boolean
}

const BookTitle: React.FC<BookTitleProps> = ({ isLight, children }) => {
	return (
		<h1
			className={`mb-6 text-center text-4xl font-bold ${isLight ? 'text-gray-900' : 'text-gray-100'}`}
		>
			{children}
		</h1>
	)
}

const BookContent: React.FC<BookContentProps> = ({ isLight, children }) => {
	return (
		<div className={`mt-4 ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
			{children}
		</div>
	)
}

const Book: React.FC<BookProps> = ({
	title,
	content,
	isLight,
	children,
	contentClassNames,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className="relative mx-auto my-12 w-full max-w-4xl"
		>
			<div
				className={`absolute inset-0 rotate-1 transform rounded-lg ${isLight ? 'bg-gray-300' : 'bg-red-900'} shadow-2xl`}
			></div>
			<div
				className={`relative overflow-hidden rounded-lg border-4 ${isLight ? 'border-gray-400 bg-white' : 'border-yellow-900 bg-black'} p-8 shadow-inner`}
			>
				<div
					className={`absolute left-0 top-0 h-16 w-full bg-gradient-to-b ${isLight ? 'from-gray-400/30' : 'from-yellow-900/30'} to-transparent`}
				></div>
				<div
					className={`absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t ${isLight ? 'from-gray-400/30' : 'from-yellow-900/30'} to-transparent`}
				></div>
				<div
					className={`absolute left-0 top-0 h-full w-16 bg-gradient-to-r ${isLight ? 'from-gray-400/30' : 'from-yellow-900/30'} to-transparent`}
				></div>
				<div
					className={`absolute right-0 top-0 h-full w-16 bg-gradient-to-l ${isLight ? 'from-gray-400/30' : 'from-yellow-900/30'} to-transparent`}
				></div>

				<div className="relative z-10">
					<BookTitle isLight={isLight}>{title}</BookTitle>
					<div
						className={`prose ${isLight ? 'prose-gray' : 'prose-invert'} prose-headings:font-serif prose-headings:text-red-500 ${isLight ? 'prose-p:text-gray-700' : 'prose-p:text-gray-300'} prose-a:text-yellow-500 hover:prose-a:text-yellow-400 max-w-none ${contentClassNames}`}
					>
						{content && <div dangerouslySetInnerHTML={{ __html: content }} />}
						<BookContent isLight={isLight}>{children}</BookContent>
					</div>
				</div>

				<div
					className={`absolute left-4 top-4 h-20 w-20 rounded-tl-lg border-l-4 border-t-4 ${isLight ? 'border-gray-400' : 'border-yellow-900'}`}
				></div>
				<div
					className={`absolute right-4 top-4 h-20 w-20 rounded-tr-lg border-r-4 border-t-4 ${isLight ? 'border-gray-400' : 'border-yellow-900'}`}
				></div>
				<div
					className={`absolute bottom-4 left-4 h-20 w-20 rounded-bl-lg border-b-4 border-l-4 ${isLight ? 'border-gray-400' : 'border-yellow-900'}`}
				></div>
				<div
					className={`absolute bottom-4 right-4 h-20 w-20 rounded-br-lg border-b-4 border-r-4 ${isLight ? 'border-gray-400' : 'border-yellow-900'}`}
				></div>
			</div>
		</motion.div>
	)
}

export default Book
