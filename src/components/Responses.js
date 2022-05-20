import React, { useEffect, useState } from 'react';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import { BsQuestionCircle } from 'react-icons/bs';
import Response from './Response';

export default function Responses(props) {
	const [allResponses, setAllResponses] = useState([]);
	const [promoters, setPromoters] = useState([]);
	const [passives, setPassives] = useState([]);
	const [detractors, setDetractors] = useState([]);
	const [sortResponse, setSortResponse] = useState("");
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const responsesCardTitle = 'Responses';
	const surveyName = 'NPS Survey';

	useEffect(() => {
		setAllResponses(props.filteredData);
		getRenderData(props.filteredData);
	}, [props.filteredData]);

	const getRenderData = (allData) => {
		let promoterRespones = [];
		let passiveResponses = [];
		let detractorResponses = [];

		for(let i = 0; i < allData.length; i++){
			if(allData[i].score >= 9) promoterRespones.push(allData[i])
			else if(allData[i].score <= 6) detractorResponses.push(allData[i])
			else passiveResponses.push(allData[i])
		}

		setPromoters(promoterRespones);
		setPassives(passiveResponses);
		setDetractors(detractorResponses);
	}

	const changeHandler = (e) => {
		e.preventDefault();
		setSortResponse(e.target.value)
	}

	return (
		<div className="responses-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header" onClick={handleShow}>
					<div>{responsesCardTitle}</div>
					<div className="question-icon">
						<BsQuestionCircle />
					</div>
				</div>
				<div>
					<label htmlFor="response-sort" />
					<select
						name="type-of-response"
						id="type-of-response"
						onChange={changeHandler}
					>
						<option value="">Show all</option>
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

				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>{responsesCardTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							Here are listed all the responses from "{surveyName}" from the
							previous six (6) months in date order showing the most recent
							responses on the top. Ongoing month's responses are not shown.
						</p>
						<p>
							The responses list will be updated automatically as soon as the
							calendar month has changed at midnight.
						</p>
						<p>
							If you have just recently started gathering data via "{surveyName}
							", you might see less than six months' responses.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="responses-list">
				{sortResponse === "" ? (
					<Response responseData={allResponses} />
				) : sortResponse === "promoters" ? (
					<Response responseData={promoters} />
				) : sortResponse === "passives" ? (
					<Response responseData={passives} />
				) : sortResponse === "detractors" ?(
					<Response responseData={detractors} />
				) : <div>No data available</div>
				}
			</div>
		</div>
	);
}
