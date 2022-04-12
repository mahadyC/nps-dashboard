import React, { useState } from "react";
import "./scoreInfo.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ScoreInfo() {
	const [value, setValue] = useState(new Date());

	function onChange(nextValue) {
		setValue(nextValue);
	}

	return (
		<div className="score">
			<div className="scoreItem">
				<div className="scoreTitle">NPS Score</div>
				<div className="npsContainer">
					<div className="npsScore">46</div>
				</div>
			</div>
			<div className="calendar">
				<Calendar selectRange={true} onChange={onChange} value={value} />
			</div>
		</div>
	);
}
