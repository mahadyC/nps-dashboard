import "./home.css";
import React from "react";
import ScoreInfo from "../../featuredInfo/ScoreInfo";
import Chart from "../../chart/Chart";
import Calenders from "../../calendar/Calendar";
import Responses from "../responses/Responses";

export default function Home() {
	return (
		<div className="home">
			<ScoreInfo />
			<Calenders />
			<Chart />
			<Responses />
		</div>
	);
}
