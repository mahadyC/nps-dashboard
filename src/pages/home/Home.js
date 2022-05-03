import './home.css';
import React from 'react';
import ScoreInfo from '../../components/featuredInfo/ScoreInfo';
import Chart from '../../components/chart/Chart';
import Calendar from '../../components/calendar/Calendar';
import Responses from '../../components/responses/Responses';

export default function Home() {
	return (
		<div className="home">
			<ScoreInfo />
			<Calendar />
			<Chart />
			<Responses />
		</div>
	);
}
