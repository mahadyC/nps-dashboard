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
				<div>
					<label htmlFor="response-sort"/>
					<select name="type-of-response" id="type-of-response">
						<option value="">Sort </option>
						<option value="promoters">Promoters</option>
						<option value="passives">Passives</option>
						<option value="detractors">Detractors</option>
					</select>
				</div>
				{allResponses.length > 0 ? (
					<div className="card-header-dates">
						{allResponses[allResponses.length - 1].date.mm + 1}.
						{allResponses[allResponses.length - 1].date.yyyy}-
						{allResponses[0].date.mm + 1}.{allResponses[0].date.yyyy}
					</div>
				) : (
					""
				)}
			</div>
			<div className="responses-list">
				{allResponses.map((answer, id) => {
					return (
						<div className="response" key={id}>
							<div className="response-colour-code-wrapper">
								<div
									className={`response-colour-code ${
										answer.score >= 9 ? "promoters-line" : ""
									} ${answer.score <= 6 ? "detractors-line" : ""} ${
										answer.score > 6 && answer.score < 9 ? "passives-line" : ""
									}`}
								></div>
								<div
									className={`response-score ${
										answer.score >= 9 ? "promoters" : ""
									} ${answer.score <= 6 ? "detractors" : ""} ${
										answer.score > 6 && answer.score < 9 ? "passives" : ""
									}`}
								>
									{answer.score}
								</div>
							</div>
							<div className="response-date-and-comment-wrapper">
								<span className="response-date">
									{answer.date.dd}/{answer.date.mm + 1}/{answer.date.yyyy}
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
