'use client'

import Layout from '../Layout'
import { config } from '@/config'
import * as React from 'react'

function levenshteinDistance(str1: string, str2: string): number {
	const len1 = str1.length;
	const len2 = str2.length;
	const dp: number[][] = Array.from({ length: len1 + 1 }, () =>
		Array(len2 + 1).fill(0)
	);

	for (let i = 0; i <= len1; i++) {
		for (let j = 0; j <= len2; j++) {
			if (i === 0) dp[i][j] = j;
			else if (j === 0) dp[i][j] = i;
			else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
			else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
		}
	}

	return dp[len1][len2];
}

// Function to get the link based on the name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLink(name: string): any | null {
	const socialLink = config.socials?.find(
		(social) => social.name?.toLowerCase() === name.toLowerCase()
	);
	
	const otherLink = config.links?.find(
		(link) => link.name?.toLowerCase() === name.toLowerCase()
	);	

	if (!socialLink && !otherLink) {
		return null;
	} else if (socialLink) {
		return socialLink;
	} else {
		return otherLink;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLinksLike(name: string): any[] {
	const allLinks = [...(config.socials || []), ...(config.links || [])];
	return allLinks.filter(
		(link) => levenshteinDistance(name.toLowerCase(), link.name.toLowerCase()) <= 5
	);
}

// Component that handles the countdown and redirection
export function LinkComponent({ name }: { name: string }): JSX.Element {
	const link = getLink(name);

	React.useEffect(() => {
		if (!link) return; // If no link is found, exit early

		let countdown = 5;
		const countdownElement = document.getElementById('countdown');

		const countdownInterval = setInterval(() => {
			countdown--;
			if (countdownElement) {
				countdownElement.textContent = countdown.toString();
			}
			if (countdown === 0) {
				clearInterval(countdownInterval);
				// Redirect only when the countdown reaches 0
				if (link) {
					window.location.href = link.url;
				}
			}
		}, 1000);

		// Cleanup interval on component unmount
		return () => {
			clearInterval(countdownInterval);
		};
	}, [link]);

	// If no link is found, show an error message
	if (!link) {
		return (
			<Layout>
				<div className="space-y-4">
					<h2 className="text-center text-2xl font-bold text-pink-600">
						Link Not Found (⊙_☉)
					</h2>
					<p className="text-center text-gray-600">
						The link you are looking for does not exist.
						
						<br />
						<br />

						Here are some similar links you might be interested in:
					</p>

					<div className="grid grid-cols-2 gap-4">
						{
							getLinksLike(name).map((link, index) => (
								<a
									key={index}
									href={`/links/${link.name.toLowerCase()}`}
									className="flex items-center justify-center bg-pink-100 p-4 rounded-lg text-pink-600 hover:bg-pink-200 transition-colors"
								>
									{
										link.icon && (
											<link.icon className="h-6 w-6 mr-2" />
										)
									}
									{link.name}
								</a>
							))
						}
					</div>
				</div>
			</Layout>
		);
	}

	// If link is found, display the countdown message
	return (
		<Layout>
			<div className="space-y-4">
				<h2 className="text-center text-2xl font-bold text-pink-600">
					{link.name}
				</h2>
				<p className="text-center text-gray-600">
					Redirecting to {link.name} in <span id="countdown">5</span> seconds...
				</p>
			</div>
		</Layout>
	);
}
