import React, { useState } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import '../App.css';
import { BsQuestionCircle } from 'react-icons/bs';
import InfoModal from './InfoModal';
export default function ScoreInfo(props) {
	let data = props.filteredData;
	let npsInfo = {};
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const npsCardTitle = 'Net Promoter Score (NPS)';
	const surveyName = 'NPS Survey';
	const npsCardBody = (
		<div>
			<p>
				The NPS for the <strong>previous six (6) months</strong> is shown in the
				center of the pie chart.
			</p>
			<p>
				Note that the chart and the number of responses{" "}
				<strong>do not include the ongoing month's</strong> survey data.
			</p>
			<p>
				The results will be updated automatically each month as soon as the
				calendar month has changed at midnight.
			</p>
			<p>
				If you have just recently started gathering data via "{surveyName}
				", you might see less than six months' NPS. Time period for the NPS is
				in the header of the section.
			</p>
		</div>
	);

	let npsCalc = (npsCalcArr) => {
		if (npsCalcArr.length === 0) return 'data missing to count nps score';
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

	npsInfo = npsCalc(data);
	let pieData = [
		{ name: 'promoters', value: npsInfo.promoters },
		{ name: 'passives', value: npsInfo.passives },
		{ name: 'detractors', value: npsInfo.detractors }
	];

	const COLORS = ['#05A8AA', '#FFCB5C', '#F07F4E'];

	return (
		<div className="nps-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header" onClick={handleShow}>
					<div>{npsCardTitle}</div>
					<div className="question-icon">
						<BsQuestionCircle />
					</div>
				</div>
				{data.length > 0 ? (
					<div className="card-header-dates">
						{data[data.length - 1].date.mm + 1}/
						{data[data.length - 1].date.yyyy}-{data[0].date.mm + 1}/
						{data[0].date.yyyy}
					</div>
				) : (
					''
				)}
				<InfoModal modalTitle={npsCardTitle} modalBody={npsCardBody} show={show} handleClose={handleClose}/>	
			</div>

			<div className="scoreItem">
				<PieChart width={140} height={140}>
					<Pie
						data={pieData}
						innerRadius="65%"
						outerRadius="100%"
						paddingAngle={3}
						dataKey="value"
					>
						{pieData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}

						<Label
							value={npsInfo.npsScore}
							position="center"
							fontFamily="Rubik"
							fontWeight={500}
							fontSize="2.2rem"
							fill="#2E282A"
						/>
					</Pie>
				</PieChart>
				{npsInfo.npsScore && (
					<div className="nps-categories">
						<div className="nps-one-category">
							<div className="nps-category-circle-promoters"></div>
							<div className="sum-number">{npsInfo.promoters}</div>
							<div className="nps-category-name">Promoters</div>
						</div>
						<div className="nps-one-category">
							<div className="nps-category-circle-passives"></div>
							<div className="sum-number">{npsInfo.passives}</div>
							<div className="nps-category-name">Passives</div>
						</div>
						<div className="nps-one-category">
							<div className="nps-category-circle-detractors"></div>
							<div className="sum-number">{npsInfo.detractors}</div>
							<div className="nps-category-name">Detractors</div>
						</div>
						<div className="nps-category-line"></div>
						<div className="nps-one-category">
							<div className="nps-category-circle-total"></div>
							<div className="sum-number">{npsInfo.totalNumOfFeedback}</div>
							<div className="nps-category-name">Total responses</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
