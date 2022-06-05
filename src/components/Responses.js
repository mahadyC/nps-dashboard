import React, { useState } from 'react';
import '../App.css';
import { BsQuestionCircle } from 'react-icons/bs';
import Response from './Response';
import InfoModal from './InfoModal';

export default function Responses(props) {
	const allResponses = props.filteredData;
	let filteredResponses = {};
	const [sortResponse, setSortResponse] = useState('');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const responsesCardTitle = 'Responses';
	const surveyName = 'NPS Survey';
	const responsesCardBody = (
		<div>
			<p>
				Here are listed all the responses from "{surveyName}" from the previous
				six (6) months in date order showing the most recent responses on the
				top. <strong>Ongoing month's responses are not shown.</strong>
			</p>
			<p>
				The responses list will be updated automatically as soon as the calendar
				month has changed at midnight.
			</p>
			<p>
				If you have just recently started gathering data via "{surveyName}
				", you might see less than six months' responses.
			</p>
		</div>
	);


	const getRenderData = (allData) => {
		let promoterResponses = [];
		let passiveResponses = [];
		let detractorResponses = [];

		for (let i = 0; i < allData.length; i++) {
			if (allData[i].score >= 9) promoterResponses.push(allData[i]);
			else if (allData[i].score <= 6) detractorResponses.push(allData[i]);
			else passiveResponses.push(allData[i]);
		}

		return {promoterResponses, detractorResponses, passiveResponses}
	};
	
	filteredResponses = getRenderData(allResponses)

	const changeHandler = (e) => {
		e.preventDefault();
		setSortResponse(e.target.value)
	};

	return (
		<div className="responses-wrapper">
			<div className="card-header-wrapper">
				<div className="cards-header" onClick={handleShow} >
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
						{allResponses[allResponses.length - 1].date.mm + 1}/
						{allResponses[allResponses.length - 1].date.yyyy}-
						{allResponses[0].date.mm + 1}/{allResponses[0].date.yyyy}
					</div>
				) : (
					''
				)}
				<InfoModal modalTitle={responsesCardTitle} modalBody={responsesCardBody} show={show} handleClose={handleClose}/>
			</div>

			<div className="responses-list">
				{sortResponse === '' ? (
					<Response responseData={allResponses} />
				) : sortResponse === 'promoters' ? (
					<Response responseData={filteredResponses.promoterResponses} />
				) : sortResponse === 'passives' ? (
					<Response responseData={filteredResponses.passiveResponses} />
				) : sortResponse === 'detractors' ? (
					<Response responseData={filteredResponses.detractorResponses} />
				) : (
					<div>No data available</div>
				)}
			</div>
		</div>
	);
}
