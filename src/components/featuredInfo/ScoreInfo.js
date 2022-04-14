import React, { useEffect, useState } from 'react';
import './scoreInfo.css';
import { db } from '../../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';

export default function ScoreInfo() {
	const [npsScore, setNspScore] = useState();
	const [allAnswers, setAllAnswers] = useState([]);

	useEffect(() => {
		showNpsScore();
	}, []);

	const showNpsScore = async () => {
		const data = query(collectionGroup(db, 'values'));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});

		const scores = [];

		for (let answer of allResults) {
			scores.push(answer.score);
		}

		let promoters = 0;
		let detractors = 0;

		let i = 0;
		let l = scores.length;

		for (i; i < l; i++) {
			if (scores[i] >= 9) promoters++;
			if (scores[i] <= 6) detractors++;
		}
		const nspScoreCalc = Math.round((promoters / l - detractors / l) * 100);
		setNspScore(nspScoreCalc);
		setAllAnswers(allResults);
	};

	return (
		<div className="score">
			<div className="scoreItem">
				<div className="scoreTitle">NPS Score</div>
				<div className="npsContainer">
					<div className="npsScore">{npsScore}</div>
				</div>
				<div>
					<h3>List of all answers:</h3>
					{allAnswers.map((answer, id) => {
						return (
							<li key={id}>
								score: {answer.score}, comments: {answer.comment}
							</li>
						);
					})}
				</div>
			</div>
		</div>
	);
}
