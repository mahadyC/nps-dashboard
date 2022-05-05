import '../App.css';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const scores = [
	{
		name: 'January',
		promoters: 37,
		passive: 8,
		detractors: 2,
		nps: 100,
	},
	{
		name: 'February',
		promoters: 30,
		passive: 5,
		detractors: 7,
		nps: 62,
	},
	{
		name: 'March',
		promoters: 50,
		passive: 2,
		detractors: 1,
		nps: -100,
	},
	{
		name: 'April',
		promoters: 24,
		passive: 9,
		detractors: 6,
		nps: 22,
	},
	{
		name: 'May',
		promoters: 46,
		passive: 12,
		detractors: 2,
		nps: -15,
	},
	{
		name: 'June',
		promoters: 80,
		passive: 10,
		detractors: 3,
		nps: -5,
	},
];

const data = {
	labels: ['January', 'February', 'March', 'April', 'June', 'July'],
	datasets: [
		{
			label: 'NPS',
			data: scores.map((scores) => scores.nps),
			borderColor: '#2E282A',
			backgroundColor: '#2E282A',
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
			label: 'Passives',
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

export default function ChartData() {
	return (
		<div className="chart-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header">NPS &amp; Responses Trends </div>
				<div className="card-header-dates">01.01.2022-30.06.2022</div>
			</div>
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
									delay = context.dataIndex * 300 + context.datasetIndex * 100;
								}
								return delay;
							},
						},
						responsive: true,
						interaction: {
							mode: 'index',
							intersect: false,
						},
						plugins: {
							title: {
								display: true,
								padding: 10,
							},
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
									padding: 10,
								},
							},
							y1: {
								type: 'linear',
								display: true,
								position: 'right',
								title: {
									display: true,
									text: 'NPS Score',
									padding: 10,
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
	);
}
