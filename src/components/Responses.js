import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import '../App.css';

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
			<div className="card-header-wrapper">
				<div className="cards-header">Responses</div>
				<div className="card-header-dates">01.01.2022-30.06.2022</div>
			</div>
			<div className="responses-list">
				{allResponses.map((answer, id) => {
					return (
						<div className="response" key={id}>
							<div className="response-colour-code-wrapper">
								<div className="response-colour-code"></div>
								<div className="response-score">{answer.score}</div>
							</div>
							<div className="response-date-and-comment-wrapper">
								<span className="response-date">2022-02-02</span>
								<span className="response-comment">{answer.comment}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
