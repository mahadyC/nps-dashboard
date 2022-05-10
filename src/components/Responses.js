import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Responses(props) {
	const [allResponses, setAllResponses] = useState([]);

	useEffect(() => {
		setAllResponses(props.filteredData)
	}, [props.filteredData]);

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
							<span>{answer.score}</span>
							<span className="response-date">{answer.date.dd}-{answer.date.mm}-{answer.date.yyyy}</span>
							<span className="response-comment">{answer.comment}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
