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
		const data = query(collectionGroup(db, 'values3'));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});
		allResults.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
		setInitialData(allResults);
	};

	let filterLastSixMonthsData = (initialData) => {
		let startingDate = new Date();
		startingDate.setMonth(startingDate.getMonth() - 7);
		let endingDate = new Date();
		endingDate.setMonth(endingDate.getMonth() - 1);	

		let sortIndexes = { indexStart: 0, indexEnd: 0 };
		for (let i = 0; i < initialData.length; i++) {
			if (
				initialData[i].date.yyyy === startingDate.getFullYear() &&
				initialData[i].date.mm === startingDate.getMonth()
				)
			sortIndexes.indexStart = initialData.indexOf(initialData[i]);		
		}
		sortIndexes.indexEnd = initialData.findIndex(
			(item) => item.date.yyyy === endingDate.getFullYear() && item.date.mm === endingDate.getMonth()
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
				<ScoreInfo filteredData={filteredData} />
				<Chart filteredData={filteredData}/>
				<Responses filteredData={filteredData} />
			</div>
		</div>
	);
}
