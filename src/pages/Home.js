import '../App.css';
import React, {useState, useEffect} from 'react';
// import ScoreInfo from '../components/ScoreInfo';
import Chart from '../components/Chart';
import Calendar from '../components/Calendar';
// import Responses from '../components/Responses';
import { db } from '../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';

export default function Home() {

	const [allResponses, setAllResponses] = useState([]);

	useEffect(() => {
		showAllResponses();
	}, []);

	const showAllResponses = async () => {
		const data = query(collectionGroup(db, 'values'));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});

		setAllResponses(allResults);
	};

	// console.log(allResponses)
	// let data = allResponses.map(item => {
	// 	return {id: item.id, score: item.score, comment: item.comment, date: new Date(item.timestamp)}
	// })
	// console.log(data)

	return (
		<div className="dashboard">
			<div className="gridwrapper">
				<Calendar />
				{/* <ScoreInfo /> */}
				{/* <Chart /> */}
				{/* <Responses /> */}
			</div>
		</div>
	);
}
