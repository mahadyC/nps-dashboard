import React, { useEffect, useState } from 'react';
import './scoreInfo.css';
import { db } from '../../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import { PieChart, Pie, Cell, Label, Tooltip } from 'recharts';

export default function ScoreInfo() {
	const [npsScore, setNpsScore] = useState();
	const [promoters, setPromoters] = useState();
	const [passives, setPassives] = useState();
	const [detractors, setDetractors] = useState();
	const [npsdata, setNpsdata] = useState([]);

	useEffect(() => {
		showNpsScore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		let passives = 0;

		let i = 0;
		let l = scores.length;

		for (i; i < l; i++) {
			if (scores[i] >= 9) promoters++;
			if (scores[i] <= 6) detractors++;
			if (scores[i] > 6 && scores[i] < 9) passives++;
		}
		const npsScoreCalc = Math.round((promoters / l - detractors / l) * 100);
		setNpsScore(npsScoreCalc);

		setPromoters(promoters);
		setPassives(passives);
		setDetractors(detractors);

		setNpsdata([
			{ name: 'promoters', value: promoters },
			{ name: 'passives', value: passives },
			{ name: 'detractors', value: detractors },
		]);
	};

	const COLORS = ['#2A9D8F', '#E2B33C', '#E76F51'];

	return (
		<div className="score">
			<div className="scoreItem">
				<h3>Net Promoter Score</h3>
				<p>for the previous 6 months</p>

				<PieChart width={300} height={207}>
					<Pie
						data={npsdata}
						innerRadius={40}
						outerRadius={90}
						paddingAngle={2}
						dataKey="value"
					>
						{npsdata.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}

						<Label value={npsScore} position="center" fontSize="2rem" />
					</Pie>
					<Tooltip />
				</PieChart>
				<p>
					Hover over the chart to see the number of reponses in different
					categories.
				</p>
			</div>
		</div>
	);
}
