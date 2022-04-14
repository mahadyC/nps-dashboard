import React, { useState } from "react";
// import Calendar from "react-calendar";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import "react-calendar/dist/Calendar.css";
import transition from "react-element-popper/animations/transition";
import InputIcon from "react-multi-date-picker/components/input_icon";

export default function Calenders() {
	const [value, setValue] = useState(new Date());

	function onChange(nextValue) {
		setValue(nextValue);
	}
	return (
		<div className="calendar">
			<DatePicker
				className="picker1"
				displayWeekNumbers
				weekNumber="WN"
				weekStartDayIndex={1}
				render={<InputIcon />}
				animations={[transition()]}
				value={value}
			/>
			<DatePicker
				className="picker2"
				displayWeekNumbers
				weekNumber="WN"
				weekStartDayIndex={1}
				render={<InputIcon />}
				animations={[transition()]}
				value={value}
			/>
			{/* <Calendar
				range
				numberOfMonths={2}
				value={value}
				onChange={setValue}
				plugins={[
					<Footer
						position="bottom"
						format="MMM DD"
						names={{
							selectedDates: "Date range:",
							from: "From:",
							to: "To:",
							selectDate: "select",
							close: "Close",
							separator: "-",
						}}
					/>,
				]}
			/> */}
		</div>
	);
}
