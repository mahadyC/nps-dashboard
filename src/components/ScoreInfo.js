import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import "../App.css";

export default function ScoreInfo(props) {
	const [npsScore, setNpsScore] = useState();
	const [promoters, setPromoters] = useState();
	const [passives, setPassives] = useState();
	const [detractors, setDetractors] = useState();
	const [total, setTotal] = useState();
	const [npsdata, setNpsdata] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(props.filteredData);
	}, [props.filteredData]);

	let npsCalc = npsCalcArr => {
		if (npsCalcArr.length === 0) return "data missing to count nps score";
		let npsScore;
		let scores = [];

		for (let i = 0; i < npsCalcArr.length; i++) {
			scores.push(npsCalcArr[i].score);
		}

		let promoters = 0;
		let detractors = 0;
		
		for (let j = 0; j < scores.length; j++) {
			if (scores[j] >= 9) promoters++;
			if (scores[j] <= 6) detractors++;
		}

		let totalNumOfFeedback = scores.length;
		let passives = totalNumOfFeedback - (promoters + detractors);

		npsScore = Math.round(
			((promoters - detractors) / totalNumOfFeedback) * 100
		);

		return {
			npsScore: npsScore,
			promoters: promoters,
			detractors: detractors,
			passives: passives,
			totalNumOfFeedback: totalNumOfFeedback,
		};
	};

	useEffect(() => {
		let val = npsCalc(data);
		setNpsScore(val.npsScore);
		setPromoters(val.promoters);
		setDetractors(val.detractors);
		setPassives(val.passives);
		setTotal(val.totalNumOfFeedback);
		setNpsdata([
			{ name: "promoters", value: val.promoters },
			{ name: "passives", value: val.passives },
			{ name: "detractors", value: val.detractors },
		]);
	}, [data]);

	const COLORS = ["#05A8AA", "#FFCB5C", "#F07F4E"];

	return (
		<div className="nps-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header">Net Promoter Score (NPS) </div>
				<div className="card-header-dates">01.01.2022-30.06.2022</div>
			</div>
			<div className="scoreItem">
				<PieChart width={100} height={100}>
					<Pie
						data={npsdata}
						innerRadius={35}
						outerRadius={50}
						paddingAngle={2}
						dataKey="value"
					>
						{npsdata.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}

						<Label
							value={npsScore}
							position="center"
							fontFamily="Rubik"
							fontWeight={500}
							fontSize="2rem"
							fill="#2E282A"
						/>
					</Pie>
					<Tooltip />
				</PieChart>
				<div className="nps-categories">
					<div className="nps-one-category">
						<div className="nps-category-circle-promoters"></div>
						<div className="sum-number">{promoters}</div>
						<div className="nps-category-name">Promoters</div>
					</div>
					<div className="nps-one-category">
						<div className="nps-category-circle-passives"></div>
						<div className="sum-number">{passives}</div>
						<div className="nps-category-name">Passives</div>
					</div>
					<div className="nps-one-category">
						<div className="nps-category-circle-detractors"></div>
						<div className="sum-number">{detractors}</div>
						<div className="nps-category-name">Detractors</div>
					</div>
					<div className="nps-category-line"></div>
					<div className="nps-one-category">
						<div className="nps-category-circle-total"></div>
						<div className="sum-number">{total}</div>
						<div className="nps-category-name">Total responses</div>
					</div>
				</div>
			</div>
		</div>
	);
}
