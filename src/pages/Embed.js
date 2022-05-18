import React, { useState, useEffect } from 'react';
import '../App.css';
import SmallScreen from '../components/SmallScreen';

export default function Embed() {
	const embedCode = `<div>
	<iframe
		title="NSP survey"
		src="https://thunderous-lollipop-68d59d.netlifyapp/"
		height="800"
		width="100%"
	></iframe>
	</div>`;

	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 750;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', () => handleWindowResize);
	}, []);

	return (
		<div className="settings-page">
			{width < breakpoint ? (
				<SmallScreen />
			) : (
				<div className="nps-survey-wrapper">
					<div className="card-header-wrapper">
						<div className="cards-header-embed">NPS Survey</div>
					</div>
					<div className="embeddedcode-wrapper">
						<div className="guide-and-link-wrapper">
							<p>
								Use the code below to display your NPS Survey on your homepage.
							</p>
							<button
								className="copy-button"
								onClick={() => navigator.clipboard.writeText(embedCode)}
							>
								copy code
							</button>
						</div>
						<div className="code-wrapper">{embedCode}</div>
					</div>
				</div>
			)}
		</div>
	);
}
