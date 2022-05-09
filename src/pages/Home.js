import '../App.css';
import React, {useState, useEffect} from 'react';
// import ScoreInfo from '../components/ScoreInfo';
import Chart from '../components/Chart';
import Calendar from '../components/Calendar';
import Responses from '../components/Responses';

export default function Home() {
	return (
		<div className="dashboard">
			<div className="gridwrapper">
				<Calendar />
				{/* <ScoreInfo /> */}
				{/* <Chart /> */}
				{/* <Responses /> */}
			</div>
		</div>
	);
}
