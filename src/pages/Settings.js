import React from 'react';
import '../App.css';

export default function Settings() {
	const embedCode = `<div>
	<iframe
		title="NSP survey"
		src="https://thunderous-lollipop-68d59d.netlifyapp/"
		height="800"
		width="100%"
	></iframe>
	</div>`;

	return (
		<div className="settings-page">
			<div className="nps-survey-wrapper">
				<div className="card-header-wrapper">
					<div className="cards-header">NPS Survey</div>
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
		</div>
	);
}
