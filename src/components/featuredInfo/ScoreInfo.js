import React, { useEffect, useState } from 'react';
import './scoreInfo.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import testData from './testData.json';

export default function ScoreInfo() {
	const [value, setValue] = useState(new Date());

	function onChange(nextValue) {
		setValue(nextValue);
	}

	useEffect(() => {
		showNpsScore();
	}, []);

	const [npsScore, setNspScore] = useState();

	const showNpsScore = () => {
		let testScores = [];

		for (let answer of testData.values) {
			testScores.push(answer.score);
			console.log(testScores);
		}

		let promoters = 0;
		let detractors = 0;

		let i = 0;
		let l = testScores.length;

		for (i; i < l; i++) {
			if (testScores[i] >= 9) promoters++;
			if (testScores[i] <= 6) detractors++;
		}
		const nspScoreCalc = Math.round((promoters / l - detractors / l) * 100);
		setNspScore(nspScoreCalc);
	};

	return (
		<div className="score">
			<div className="scoreItem">
				<div className="scoreTitle">NPS Score</div>
				<div className="npsContainer">
					<div className="npsScore">{npsScore}</div>
				</div>
			</div>
			<div className="calendar">
				<Calendar selectRange={true} onChange={onChange} value={value} />
			</div>
		</div>
	);
}
