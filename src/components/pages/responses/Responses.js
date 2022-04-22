import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import './responses.css';

export default function Responses() {
	const [allResponses, setAllResponses] = useState([]);

	useEffect(() => {
		showAllResponses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	return (
		<div className="responses-wrapper">
			<h3>All responses:</h3>
			{allResponses.map((answer, id) => {
				return (
					<li key={id}>
						score: {answer.score}, comments: {answer.comment}
					</li>
				);
			})}
		</div>
	);
}
