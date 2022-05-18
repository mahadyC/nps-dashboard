export default function Response(props) {
	return (
		<div>
			{props.responseData.map((answer, id) => {
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
	);
}
