import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import { db } from '../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import '../App.css';

import ScoreInfo from '../components/ScoreInfo';
import Responses from '../components/Responses';
import Chart from '../components/Chart';

export default function Calendar() {
	let [filteredData, setFilteredData] = useState([]);
	let [initialData, setInitialData] = useState([]);

	useEffect(() => {
		getAllResponses();
	},[]);

	const getAllResponses = async () => {
		const data = query(collectionGroup(db, 'values2'));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});
		allResults.sort((a, b) => b.date.yyyy - a.date.yyyy);
		setInitialData(allResults);
	};

	let filterLastSixMonthsData = (initialData) => {
		let startingDate = new Date();
		startingDate.setMonth(startingDate.getMonth() - 6);
		let endingDate = new Date();

		let startDate = {
			yy: startingDate.getFullYear(),
			mm: startingDate.getMonth(),
		};
		let endDate = { yy: endingDate.getFullYear(), mm: endingDate.getMonth() };

		let sortIndexes = { indexStart: 0, indexEnd: 0 };
		for (let i = 0; i < initialData.length; i++) {
			if (
				initialData[i].date.yyyy === startDate.yy &&
				initialData[i].date.mm === startDate.mm
			)
				sortIndexes.indexStart = initialData.indexOf(initialData[i]);
		}
		sortIndexes.indexEnd = initialData.findIndex(
			(item) => item.date.yyyy === endDate.yy && item.date.mm === endDate.mm
		);
		return initialData.slice(sortIndexes.indexEnd, sortIndexes.indexStart);
	};

	useEffect(() => {
		let data = filterLastSixMonthsData(initialData);
		setFilteredData(data);
	}, [initialData]);

	return (
		<div className="dashboard">
			<div className="gridwrapper">
				{/* <div className="calendar1">
					<form>
						<div>
							<label htmlFor="from">
								From:{" "}
								<input
									type="date"
									id="fromDate"
								/>
							</label>
							<label htmlFor="to">
								To:{" "}
								<input
									type="date"
									id="toDate"
								/>
							</label>
							<button type="submit" className="show-button">
								Show Data
							</button>
						</div>
					</form>
				</div> */}
				<ScoreInfo filteredData={filteredData} />
				<Chart filteredData={filteredData}/>
				<Responses filteredData={filteredData} />
			</div>
		</div>
	);
}
