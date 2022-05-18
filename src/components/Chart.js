import '../App.css';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { BsQuestionCircle } from 'react-icons/bs';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export default function ChartData(props) {
	const [primaryData, setPrimaryData] = useState([]);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const barChartCardTitle = 'NPS & Responses Trends';
	const surveyName = 'NPS Survey';

	useEffect(() => {
		setPrimaryData(props.filteredData);
	}, [props.filteredData]);
	let sortableData = primaryData;

	let chartData = sortableData;

	let month6 = [];
	let month5 = [];
	let month4 = [];
	let month3 = [];
	let month2 = [];
	let month1 = [];

	let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	let npsData = chartData;

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

	let yearMonth6 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		npsInfo: {
			promoters: 0,
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};
	let yearMonth5 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		npsInfo: {
			promoters: 0,
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};
	let yearMonth4 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		npsInfo: {
			promoters: 0,
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};
	let yearMonth3 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		npsInfo: {
			promoters: 0,
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};
	let yearMonth2 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		promoters: 0,
		npsInfo: {
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};
	let yearMonth1 = {
		yyyy: 0,
		mm: 0,
		monthName: '',
		npsInfo: {
			promoters: 0,
			passives: 0,
			detractors: 0,
			npsScore: 0,
		},
	};

	let today = new Date();
	today.setMonth(today.getMonth() - 1);
	yearMonth6.yyyy = today.getFullYear();
	yearMonth6.mm = today.getMonth();
	yearMonth6.monthName = month[today.getMonth()];

	today.setMonth(today.getMonth() - 1);
	yearMonth5.yyyy = today.getFullYear();
	yearMonth5.mm = today.getMonth();
	yearMonth5.monthName = month[today.getMonth()];

	today.setMonth(today.getMonth() - 1);
	yearMonth4.yyyy = today.getFullYear();
	yearMonth4.mm = today.getMonth();
	yearMonth4.monthName = month[today.getMonth()];

	today.setMonth(today.getMonth() - 1);
	yearMonth3.yyyy = today.getFullYear();
	yearMonth3.mm = today.getMonth();
	yearMonth3.monthName = month[today.getMonth()];

	today.setMonth(today.getMonth() - 1);
	yearMonth2.yyyy = today.getFullYear();
	yearMonth2.mm = today.getMonth();
	yearMonth2.monthName = month[today.getMonth()];

	today.setMonth(today.getMonth() - 1);
	yearMonth1.yyyy = today.getFullYear();
	yearMonth1.mm = today.getMonth();
	yearMonth1.monthName = month[today.getMonth()];

	for (let b = 0; b < npsData.length; b++) {
		if (
			npsData[b].date.yyyy === yearMonth6.yyyy &&
			npsData[b].date.mm === yearMonth6.mm
		) {
			month6.push(npsData[b]);
		} else if (
			npsData[b].date.yyyy === yearMonth5.yyyy &&
			npsData[b].date.mm === yearMonth5.mm
		) {
			month5.push(npsData[b]);
		} else if (
			npsData[b].date.yyyy === yearMonth4.yyyy &&
			npsData[b].date.mm === yearMonth4.mm
		) {
			month4.push(npsData[b]);
		} else if (
			npsData[b].date.yyyy === yearMonth3.yyyy &&
			npsData[b].date.mm === yearMonth3.mm
		) {
			month3.push(npsData[b]);
		} else if (
			npsData[b].date.yyyy === yearMonth2.yyyy &&
			npsData[b].date.mm === yearMonth2.mm
		) {
			month2.push(npsData[b]);
		} else if (
			npsData[b].date.yyyy === yearMonth1.yyyy &&
			npsData[b].date.mm === yearMonth1.mm
		) {
			month1.push(npsData[b]);
		}
	}

	yearMonth6.npsInfo = npsCalc(month6);
	yearMonth5.npsInfo = npsCalc(month5);
	yearMonth4.npsInfo = npsCalc(month4);
	yearMonth3.npsInfo = npsCalc(month3);
	yearMonth2.npsInfo = npsCalc(month2);
	yearMonth1.npsInfo = npsCalc(month1);

	const scores = [
		{
			name: yearMonth1.monthName,
			promoters: yearMonth1.npsInfo.promoters,
			passive: yearMonth1.npsInfo.passives,
			detractors: yearMonth1.npsInfo.detractors,
			nps: yearMonth1.npsInfo.npsScore,
		},
		{
			name: yearMonth2.monthName,
			promoters: yearMonth2.npsInfo.promoters,
			passive: yearMonth2.npsInfo.passives,
			detractors: yearMonth2.npsInfo.detractors,
			nps: yearMonth2.npsInfo.npsScore,
		},
		{
			name: yearMonth3.monthName,
			promoters: yearMonth3.npsInfo.promoters,
			passive: yearMonth3.npsInfo.passives,
			detractors: yearMonth3.npsInfo.detractors,
			nps: yearMonth3.npsInfo.npsScore,
		},
		{
			name: yearMonth4.monthName,
			promoters: yearMonth4.npsInfo.promoters,
			passive: yearMonth4.npsInfo.passives,
			detractors: yearMonth4.npsInfo.detractors,
			nps: yearMonth4.npsInfo.npsScore,
		},
		{
			name: yearMonth5.monthName,
			promoters: yearMonth5.npsInfo.promoters,
			passive: yearMonth5.npsInfo.passives,
			detractors: yearMonth5.npsInfo.detractors,
			nps: yearMonth5.npsInfo.npsScore,
		},
		{
			name: yearMonth6.monthName,
			promoters: yearMonth6.npsInfo.promoters,
			passive: yearMonth6.npsInfo.passives,
			detractors: yearMonth6.npsInfo.detractors,
			nps: yearMonth6.npsInfo.npsScore,
		},
	];

	const data = {
		labels: [
			yearMonth1.monthName,
			yearMonth2.monthName,
			yearMonth3.monthName,
			yearMonth4.monthName,
			yearMonth5.monthName,
			yearMonth6.monthName,
		],
		datasets: [
			{
				label: 'NPS',
				data: scores.map((scores) => scores.nps),
				borderColor: '#2e282a',
				backgroundColor: '#2e282a',
				yAxisID: 'y1',
				type: 'line',
			},
			{
				label: 'Promoters',
				data: scores.map((scores) => scores.promoters),
				borderColor: '#05A8AA',
				backgroundColor: '#05A8AA',
				yAxisID: 'y',
				type: 'bar',
				stacked: true,
				barThickness: 20,
			},
			{
				label: 'Passive',
				data: scores.map((scores) => scores.passive),
				borderColor: '#FFCB5C',
				backgroundColor: '#FFCB5C',
				yAxisID: 'y',
				type: 'bar',
				stacked: true,
				barThickness: 20,
			},
			{
				label: 'Detractors',
				data: scores.map((scores) => scores.detractors),
				borderColor: '#F07F4E',
				backgroundColor: '#F07F4E',
				yAxisID: 'y',
				type: 'bar',
				stacked: true,
				barThickness: 20,
			},
		],
	};

	let delayed;

	return (
		<div className="chart-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header" onClick={handleShow}>
					<div>{barChartCardTitle}</div>
					<div className="question-icon">
						<BsQuestionCircle />
					</div>
				</div>
				{yearMonth6.mm !== 0  ? (
					<div className="card-header-dates">{yearMonth1.mm}.{yearMonth1.yyyy}-{yearMonth6.mm + 1}.{yearMonth6.yyyy}</div>
				) : (
					""
				)}
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>{barChartCardTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							This chart shows you the NPS trend and the trend of responses for
							the previous six (6) months. The chart does not show the ongoing
							month's results.
						</p>
						<p>
							The chart will be updated automatically as soon as the calendar
							month has changed at midnight.
						</p>
						<p>
							Hover over the bars and you will see the NPS score and the number
							of responses in each category.
						</p>
						<p>
							If you have just recently started gathering data via "{surveyName}
							", you might see less than six months' results.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="chart-container">
				<div className="chart">
					<Bar
						type="bar"
						data={data}
						options={{
							animation: {
								onComplete: () => {
									delayed = true;
								},
								delay: (context) => {
									let delay = 0;
									if (
										context.type === 'data' &&
										context.mode === 'default' &&
										!delayed
									) {
										delay =
											context.dataIndex * 300 + context.datasetIndex * 100;
									}
									return delay;
								},
							},
							responsive: true,
							interaction: {
								mode: 'index',
								intersect: false,
							},

							scales: {
								x: {
									stacked: true,
								},
								y: {
									type: 'linear',
									display: true,
									position: 'left',
									stacked: true,
									borderColor: 'rgb(0, 0, 255)',
									title: {
										display: true,
										text: 'NPS Responses',
										padding: 0,
									},
								},
								y1: {
									type: 'linear',
									display: true,
									position: 'right',
									title: {
										display: true,
										text: 'NPS Score',
										padding: 0,
									},
									// grid line settings
									grid: {
										drawOnChartArea: false,
									},
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
