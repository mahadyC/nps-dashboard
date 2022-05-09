import React from "react";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase-config";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import "../App.css";

export default function Calendar() {
	// useEffect(() => {
	// 	showNpsScore();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// const showNpsScore = async () => {
	// 	const data = query(collectionGroup(db, "values"));
	// 	const querySnapshot = await getDocs(data);

	// 	const allResults = [];

	// 	querySnapshot.forEach((doc) => {
	// 		allResults.push(doc.data());
	// 		// console.log(allResults);
	// 	});

	// 	const timestamps = [];

	// 	for (let response of allResults) {
	// 		// response.timestamp.toDate();
	// 		timestamps.push(response.timestamp);
	// 	}
	// 	console.log(timestamps);

	// 	console.log(allResults[0].timestamp.toDate());
	// };

	const showData = async (e) => {
		e.preventDefault();

		const data = query(collectionGroup(db, "values"));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
			console.log(allResults);
		});

		const timestamps = [];

		for (let response of allResults) {
			// response.timestamp.toDate();
			timestamps.push(response.timestamp);
		}
		console.log(timestamps);

		// const createdAt = firebase.firestore.timestamp.fromDate(new Date());

		// const formatDate = dayjs.unix(createdAt.seconds).format("YYYY-MM-DD");

		// const formattedTimestamp = allResults.timestamp.toDate();

		// console.log(formattedTimestamp);

		// const formattedDate = formattedTimestamp.toISOString().slice(0, 10);
		// console.log(formattedDate);

		const timestamp0 = allResults[0].timestamp.toDate();
		console.log(timestamp0);

		const formatDate = timestamp0.toISOString().slice(0, 10);
		console.log(formatDate);

		const timestamp1 = allResults[3].timestamp.toDate();
		console.log(timestamp1);

		const formatDate2 = timestamp1.toISOString().slice(0, 10);
		console.log(formatDate2);

		// const timestamp0 = allResults[0].timestamp.newDate();
		// const dateStr = timestamp0.toISOString();
		// console.log(dateStr);

		// const date = new Date();
		// const dateStr = date.toISOString();
		// console.log(dateStr);

		// const date = {
		// 	convert: function (timestamp0) {
		// 		return timestamp0.constructor === String ? new Date(timestamp0) : NaN;
		// 	},
		// };

		const from = e.target.fromDate.value;
		const to = e.target.toDate.value;
		console.log(from, "-", to);
		if (formatDate === from && formatDate2 === to) {
			console.log(formatDate.score + formatDate2.score);
		} else {
			console.log("nooooo");
		}
	};

	// {
	// 	allResults
	// 		.filter(
	// 			(allResults) =>
	// 				allResults.timeStamp >= from || allResults.timeStamp <= to
	// 		)
	// 		.map((filteredResult) => ({ filteredResult }));
	// }
	// console.log(allResults);

	return (
		<div className="calendar1">
			<form onSubmit={showData}>
				<label htmlFor="from">
					From: <input type="date" id="fromDate" />
				</label>
				<label htmlFor="to">
					To: <input type="date" id="toDate" />
				</label>
				<button type="submit" className="show-button">
					Show Data
				</button>
			</form>
		</div>
	);
}
