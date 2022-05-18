import React from 'react';
import '../App.css';

const SmallScreen = () => {
	return (
		<div className="small-screen">
			<h1>Ooops! </h1>
			<p>Your screen is too small for this application.</p>
			<p>Please use tablet size screen or larger (min 750 pixels).</p>
		</div>
	);
};

export default SmallScreen;
