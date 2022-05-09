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
		const data = query(collectionGroup(db, 'values2'));
		const querySnapshot = await getDocs(data);

		const allResults = [];

		querySnapshot.forEach((doc) => {
			allResults.push(doc.data());
		});

		setAllResponses(allResults);
	};
	// console.log(allResponses)
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
								<div
									className={`response-colour-code ${
										answer.score >= 9 ? 'promoters-line' : ''
									} ${answer.score <= 6 ? 'detractors-line' : ''} ${
										answer.score > 6 && answer.score < 9 ? 'passives-line' : ''
									}`}
								></div>
								<div
									className={`response-score ${
										answer.score >= 9 ? 'promoters' : ''
									} ${answer.score <= 6 ? 'detractors' : ''} ${
										answer.score > 6 && answer.score < 9 ? 'passives' : ''
									}`}
								>
									{answer.score}
								</div>
							</div>
							<div className="response-date-and-comment-wrapper">
								<span className="response-date">
									{answer.date.yyyy}/{answer.date.mm}/{answer.date.dd}
								</span>
								<span className="response-comment">{answer.comment}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
