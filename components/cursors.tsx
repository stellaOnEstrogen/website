'use client'

import React, { useEffect, useRef } from 'react'

const Cursors: React.FC = () => {
	const cursorRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const cursor = document.createElement('div')
		cursor.className = 'custom-cursor'
		document.body.appendChild(cursor)
		cursorRef.current = cursor

		const updateCursor = (e: MouseEvent) => {
			if (cursorRef.current) {
				cursorRef.current.style.left = `${e.clientX}px`
				cursorRef.current.style.top = `${e.clientY}px`
			}
		}

		const updateCursorType = (e: MouseEvent) => {
			if (!cursorRef.current) return

			const target = e.target as HTMLElement
			if (
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.tagName === 'SELECT'
			) {
				cursorRef.current.classList.add('hovering-interactive')
				cursorRef.current.classList.remove('hovering-text', 'hovering-default')
			} else if (
				target.tagName === 'P' ||
				target.tagName === 'SPAN' ||
				target.tagName === 'H1' ||
				target.tagName === 'H2' ||
				target.tagName === 'H3' ||
				target.tagName === 'H4' ||
				target.tagName === 'H5' ||
				target.tagName === 'H6' ||
				target.tagName === 'LI' ||
				target.tagName === 'TD' ||
				target.tagName === 'TH'
			) {
				cursorRef.current.classList.add('hovering-text')
				cursorRef.current.classList.remove(
					'hovering-interactive',
					'hovering-default',
				)
			} else if (
				target.tagName === 'IMG' ||
				target.tagName === 'VIDEO' ||
				target.tagName === 'CANVAS'
			) {
				cursorRef.current.classList.add('hovering-media')
				cursorRef.current.classList.remove(
					'hovering-interactive',
					'hovering-text',
					'hovering-default',
				)
			} else {
				cursorRef.current.classList.add('hovering-default')
				cursorRef.current.classList.remove(
					'hovering-interactive',
					'hovering-text',
					'hovering-media',
				)
			}
		}

		document.addEventListener('mousemove', updateCursor)
		document.addEventListener('mouseover', updateCursorType)

		return () => {
			document.removeEventListener('mousemove', updateCursor)
			document.removeEventListener('mouseover', updateCursorType)
			if (cursorRef.current && document.body.contains(cursorRef.current)) {
				document.body.removeChild(cursorRef.current)
			}
		}
	}, [])

	return (
		<style jsx global>{`
			* {
				cursor: none !important;
			}
			.custom-cursor {
				position: fixed;
				pointer-events: none;
				z-index: 9999;
				width: 20px;
				height: 20px;
				border: 2px solid #ff0000;
				border-radius: 50%;
				transition: all 0.1s ease;
			}
			.custom-cursor::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 4px;
				height: 4px;
				background-color: #ff0000;
				border-radius: 50%;
			}
			.custom-cursor.hovering-interactive {
				width: 40px;
				height: 40px;
				background-color: rgba(255, 0, 0, 0.2);
				border: 2px solid #ff0000;
				mix-blend-mode: difference;
			}
			.custom-cursor.hovering-interactive::before {
				content: '666';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #ff0000;
				font-size: 12px;
				font-weight: bold;
			}
			.custom-cursor.hovering-text {
				width: 30px;
				height: 30px;
				border: 2px dashed #ff0000;
			}
			.custom-cursor.hovering-text::after {
				content: '';
				width: 6px;
				height: 6px;
				background-color: #ff0000;
				clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
				border-radius: 0;
			}
			.custom-cursor.hovering-media {
				width: 50px;
				height: 50px;
				border: 2px dotted #ff0000;
				opacity: 0.7;
			}
			.custom-cursor.hovering-media::after {
				content: '👁️';
				font-size: 20px;
				background: none;
				width: auto;
				height: auto;
			}
			.custom-cursor.hovering-default {
				width: 20px;
				height: 20px;
				border: 2px solid #ff0000;
			}
			.custom-cursor.hovering-default::after {
				width: 4px;
				height: 4px;
				background-color: #ff0000;
				border-radius: 50%;
			}
		`}</style>
	)
}

export default Cursors
