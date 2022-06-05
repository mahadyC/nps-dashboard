import React, { useState, useEffect } from 'react';
import '../App.css';

import ScoreInfo from './ScoreInfo';
import Responses from './Responses';
import Chart from './Chart';
import SmallScreen from './SmallScreen';

export default function Dashboard(props) {
	let [filteredData, setFilteredData] = useState([]);
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 750;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', () => handleWindowResize);
	}, []);


	let filterLastSixMonthsData = (primaryData) => {
		if (primaryData.length !== 0) {
			let startingDate = new Date();
			startingDate.setMonth(startingDate.getMonth() - 7);
			let endingDate = new Date();
			endingDate.setMonth(endingDate.getMonth() - 1);

			if (
				primaryData[primaryData.length - 1].timestamp.seconds >
				Math.round(startingDate.getTime() / 1000)
			) {
				return primaryData;
			}
			let sortIndexes = { indexStart: 0, indexEnd: 0 };
			for (let i = 0; i < primaryData.length; i++) {
				if (
					primaryData[i].date.yyyy === startingDate.getFullYear() &&
					primaryData[i].date.mm === startingDate.getMonth()
				)
					sortIndexes.indexStart = primaryData.indexOf(primaryData[i]);
			}
			sortIndexes.indexEnd = primaryData.findIndex(
				(item) =>
					item.date.yyyy === endingDate.getFullYear() &&
					item.date.mm === endingDate.getMonth()
			);
			return primaryData.slice(sortIndexes.indexEnd, sortIndexes.indexStart);
		} else return [];
	};

	useEffect(() => {
		let data = filterLastSixMonthsData(props.dataForDashboard);
		setFilteredData(data);
	}, []);

	return (
		<div className="dashboard">
			<div className="gridwrapper">
				<ScoreInfo filteredData={filteredData} />
				<Chart filteredData={filteredData} />
				<Responses filteredData={filteredData} />
			</div>
			{width < breakpoint && <SmallScreen />}
		</div>
	);
}
