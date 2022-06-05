
import "../App.css";
import 'firebase/auth';
import 'firebase/firestore';
import { db } from '../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

export default function Home() {
	const firebaseCollectionName = 'values3';
	let [dataForDashboard, setDataForDashboard] = useState([]);
	const getAllResponses = async () => {
		const data = query(collectionGroup(db, firebaseCollectionName));
		const querySnapshot = await getDocs(data);
		
		const allResults = [];
		
		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});
		allResults.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
		setDataForDashboard(allResults);
	};
	
	useEffect(() => {
		getAllResponses();
	}, []);

	if(dataForDashboard.length !== 0)
		return <Dashboard dataForDashboard={dataForDashboard}/>;
}
