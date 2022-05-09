import React from "react";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase-config";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import "../App.css";

import ScoreInfo from '../components/ScoreInfo';
import Responses from '../components/Responses';
import Chart from '../components/Chart';



export default function Calendar() {

	let [calendarFrom, setCalenderFrom] = useState({});
	let [calendarTo, setCalenderTo] = useState({});


	let arr = [
		{ date: { yy: 2022, mm: 3, dd: 2 }, score: 9 },
		{ date: { yy: 2022, mm: 3, dd: 2 }, score: 9  },
		{ date: { yy: 2022, mm: 3, dd: 2 }, score: 9  },
		{ date: { yy: 2022, mm: 2, dd: 2 }, score: 9  },
    	{ date: { yy: 2022, mm: 2, dd: 2 }, score: 9  },
    	{ date: { yy: 2022, mm: 2, dd: 2 }, score: 9  },
    	{ date: { yy: 2022, mm: 1, dd: 2 }, score: 9  },
   	 	{ date: { yy: 2022, mm: 1, dd: 2 }, score: 7  },
    	{ date: { yy: 2022, mm: 1, dd: 2 }, score: 8  },
    	{ date: { yy: 2022, mm: 1, dd: 2 }, score: 9  }
	];
	
	let sortByMonth = (startDate, endDate) => {
		console.log(startDate, endDate)
		let sortIndexes = { indexStart: 0, indexEnd: 0 };
		sortIndexes.indexStart = arr.findIndex(item => (item.date.yy === startDate.yy && item.date.mm === startDate.mm));
	    for(let i = 0; i < arr.length; i++){
	      if(arr[i].date.yy === endDate.yy && arr[i].date.mm === endDate.mm) sortIndexes.indexEnd = arr.indexOf(arr[i]);
    }
	    return arr.slice(sortIndexes.indexStart, sortIndexes.indexEnd + 1);
	};

	console.log(sortByMonth({ yy: 2022, mm: 1, dd: 2 }, { yy: 2022, mm: 3, dd: 2 }))
	// Create a form handler function in Calender

	let formHandler = (e) => {
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
			<form onSubmit={formHandler}>
				<div>
					<label htmlFor="from">
						From: <input type="date" id="fromDate" required onChange={fromChangeHandler}/>
					</label>
					<label htmlFor="to">
						To: <input type="date" id="toDate" required onChange={toChangeHandler}/>
					</label>
					<button type="submit" className="show-button">
						Show Data
					</button>
				</div>
			</form>
			<ScoreInfo />
			{/* <Chart /> */}
			<Responses />
		</div>
	);
}
