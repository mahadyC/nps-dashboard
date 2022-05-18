import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import { BsQuestionCircle } from 'react-icons/bs';

export default function ScoreInfo(props) {
	const [npsScore, setNpsScore] = useState();
	const [promoters, setPromoters] = useState();
	const [passives, setPassives] = useState();
	const [detractors, setDetractors] = useState();
	const [total, setTotal] = useState();
	const [npsdata, setNpsdata] = useState([]);
	const [data, setData] = useState([]);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const npsCardTitle = 'Net Promoter Score (NPS)';

	useEffect(() => {
		setData(props.filteredData);
	}, [props.filteredData]);

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

	useEffect(() => {
		let val = npsCalc(data);
		setNpsScore(val.npsScore);
		setPromoters(val.promoters);
		setDetractors(val.detractors);
		setPassives(val.passives);
		setTotal(val.totalNumOfFeedback);
		setNpsdata([
			{ name: 'promoters', value: val.promoters },
			{ name: 'passives', value: val.passives },
			{ name: 'detractors', value: val.detractors },
		]);
	}, [data]);

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
						{data[data.length - 1].date.mm + 1}.
						{data[data.length - 1].date.yyyy}-{data[0].date.mm + 1}.
						{data[0].date.yyyy}
					</div>
				) : (
					""
				)}

				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>{npsCardTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							The NPS for the previous six (6) months is shown in the center of
							the pie chart. Note that the chart and the number of responses do
							not include the ongoing month's survey responses.
						</p>
						<p>
							The results will be updated automatically each month as soon as
							the calendar month has changed at midnight.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="scoreItem">
				<PieChart width={140} height={140}>
					<Pie
						data={npsdata}
						innerRadius="65%"
						outerRadius="100%"
						paddingAngle={3}
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
							fontSize="2.2rem"
							fill="#2E282A"
						/>
					</Pie>
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
