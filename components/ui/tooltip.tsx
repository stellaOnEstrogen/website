import React, { useState } from 'react'

interface TooltipProps {
	content: string
	children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className="relative inline-block">
			<div
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onFocus={() => setIsVisible(true)}
				onBlur={() => setIsVisible(false)}
			>
				{children}
			</div>
			{isVisible && (
				<div
					role="tooltip"
					className="tooltip absolute z-10 rounded-lg bg-pink-500 px-3 py-2 text-sm font-medium text-white shadow-sm dark:bg-pink-700"
					style={{
						bottom: 'calc(100% + 10px)',
						left: '50%',
						transform: 'translateX(-50%)',
						whiteSpace: 'nowrap',
					}}
				>
					{content}
					<div
						className="absolute h-2 w-2 bg-pink-500 dark:bg-pink-700"
						style={{
							bottom: '-4px',
							left: '50%',
							transform: 'translateX(-50%) rotate(45deg)',
						}}
					></div>
				</div>
			)}
		</div>
	)
}
