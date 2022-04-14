import "./chart.css";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		name: "Month 1",
		promoters: 37,
		passive: 8,
		detractors: 2,
	},
	{
		name: "Month 2",
		promoters: 30,
		passive: 5,
		detractors: 7,
	},
	{
		name: "Month 3",
		promoters: 50,
		passive: 2,
		detractors: 1,
	},
	{
		name: "Month 4",
		promoters: 24,
		passive: 9,
		detractors: 6,
	},
	{
		name: "Month 5",
		promoters: 46,
		passive: 12,
		detractors: 2,
	},
	{
		name: "Month 6",
		promoters: 42,
		passive: 10,
		detractors: 3,
	},
];

export default function Chart() {
	return (
		<div className="chart">
			<h3 className="chartTitle">NPS questionnaire answers</h3>
			<ResponsiveContainer width="100%" height="80%">
				<BarChart
					width={200}
					height={250}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="promoters" fill="green" barSize={10} />
					<Bar dataKey="passive" fill="rgb(255, 197, 6)" barSize={10} />
					<Bar dataKey="detractors" fill="red" barSize={10} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
