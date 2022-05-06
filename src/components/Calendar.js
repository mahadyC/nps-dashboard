import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
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
		console.log(sortByMonth(calendarFrom, calendarTo))
	}

	// console.log(calendarFrom, calendarTo);

	let fromChangeHandler = (e) => {
		let sDate = new Date(e.target.value);
		let calendarStartDate = {yy: sDate.getFullYear(), mm: sDate.getMonth() + 1, dd: sDate.getDate()}
		setCalenderFrom(calendarStartDate)
	}

	let toChangeHandler = (e) => {
		let eDate = new Date(e.target.value);
		let calendarEndDate = {yy: eDate.getFullYear(), mm: eDate.getMonth() + 1, dd: eDate.getDate()}
		setCalenderTo(calendarEndDate);
	}


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
