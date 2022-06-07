import '../App.css';
import { Bar } from 'react-chartjs-2';
import { BsQuestionCircle } from 'react-icons/bs';
import { Chart as ChartJS, registerables } from 'chart.js';
import InfoModal from './InfoModal';
ChartJS.register(...registerables);

export default function ChartData(props) {
	const primaryData = props.filteredData;
	const toggleModal = () => props.toggleChartDataInfoModal(props.show);
	const barChartCardTitle = 'NPS & Responses Trends';
	const surveyName = 'NPS Survey';
	const barChartCardBody = (
		<div>
			<p>
				This chart shows you the NPS trend and the trend of responses for the
				previous six (6) months. The chart does not show the ongoing month's
				results.
			</p>
			<p>
				The chart will be updated automatically as soon as the calendar month
				has changed at midnight.
			</p>
			<p>
				Hover over or click the bars and you will see the NPS score and the
				number of responses in each category.
			</p>
			<p>
				If you have just recently started gathering data via "{surveyName}
				", you might see less than six months' results.
			</p>
		</div>
	);

	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const npsCalc = (npsCalcArr) => {
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

	let dataLastSixMonths = {
		dataMonth6: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
		dataMonth5: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
		dataMonth4: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
		dataMonth3: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
		dataMonth2: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
		dataMonth1: {
			yyyy: 0,
			mm: 0,
			monthName: '',
			npsInfo: {
				promoters: 0,
				passives: 0,
				detractors: 0,
				npsScore: 0,
			},
			responses: [],
		},
	};

	const setDateDataLastSixMonths = () => {
		let today = new Date();
		Object.entries(dataLastSixMonths).forEach(([key, value]) => {
			today.setMonth(today.getMonth() - 1);
			value.yyyy = today.getFullYear();
			value.mm = today.getMonth();
			value.monthName = month[today.getMonth()];
		});
	};
	setDateDataLastSixMonths();

	const getSixMonthResponses = () => {
		for (let b = 0; b < primaryData.length; b++) {
			if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth6.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth6.mm
			) {
				dataLastSixMonths.dataMonth6.responses.push(primaryData[b]);
			} else if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth5.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth5.mm
			) {
				dataLastSixMonths.dataMonth5.responses.push(primaryData[b]);
			} else if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth4.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth4.mm
			) {
				dataLastSixMonths.dataMonth4.responses.push(primaryData[b]);
			} else if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth3.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth3.mm
			) {
				dataLastSixMonths.dataMonth3.responses.push(primaryData[b]);
			} else if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth2.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth2.mm
			) {
				dataLastSixMonths.dataMonth2.responses.push(primaryData[b]);
			} else if (
				primaryData[b].date.yyyy === dataLastSixMonths.dataMonth1.yyyy &&
				primaryData[b].date.mm === dataLastSixMonths.dataMonth1.mm
			) {
				dataLastSixMonths.dataMonth1.responses.push(primaryData[b]);
			}
		}
	};
	getSixMonthResponses();

	const calculateSixMonthNps = () => {
		Object.entries(dataLastSixMonths).forEach(([key, value]) => {
			value.npsInfo = npsCalc(value.responses);
		});
	};
	calculateSixMonthNps();
	const scores = [
		dataLastSixMonths.dataMonth1.npsInfo,
		dataLastSixMonths.dataMonth2.npsInfo,
		dataLastSixMonths.dataMonth3.npsInfo,
		dataLastSixMonths.dataMonth4.npsInfo,
		dataLastSixMonths.dataMonth5.npsInfo,
		dataLastSixMonths.dataMonth6.npsInfo,
	];

	const data = {
		labels: [
			dataLastSixMonths.dataMonth1.monthName,
			dataLastSixMonths.dataMonth2.monthName,
			dataLastSixMonths.dataMonth3.monthName,
			dataLastSixMonths.dataMonth4.monthName,
			dataLastSixMonths.dataMonth5.monthName,
			dataLastSixMonths.dataMonth6.monthName,
		],
		datasets: [
			{
				label: 'NPS',
				data: scores.map((score) => score.npsScore),
				borderColor: '#2e282a',
				backgroundColor: '#2e282a',
				yAxisID: 'y1',
				type: 'line',
			},
			{
				label: 'Promoters',
				data: scores.map((score) => score.promoters),
				borderColor: '#05A8AA',
				backgroundColor: '#05A8AA',
				yAxisID: 'y',
				type: 'bar',
				stacked: true,
				barThickness: 20,
			},
			{
				label: 'Passive',
				data: scores.map((score) => score.passives),
				borderColor: '#FFCB5C',
				backgroundColor: '#FFCB5C',
				yAxisID: 'y',
				type: 'bar',
				stacked: true,
				barThickness: 20,
			},
			{
				label: 'Detractors',
				data: scores.map((score) => score.detractors),
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
				<div className="cards-header" onClick={toggleModal}>
					<div>{barChartCardTitle}</div>
					<div className="question-icon">
						<BsQuestionCircle />
					</div>
				</div>
				{dataLastSixMonths.dataMonth6.mm !== 0 && primaryData.length > 0 ? (
					<div className="card-header-dates">
						{primaryData[primaryData.length - 1].date.mm + 1}/
						{primaryData[primaryData.length - 1].date.yyyy}-
						{primaryData[0].date.mm + 1}/{primaryData[0].date.yyyy}
					</div>
				) : (
					''
				)}
				<InfoModal modalTitle={barChartCardTitle} modalBody={barChartCardBody} show={props.show} handleClose={toggleModal}/>
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
