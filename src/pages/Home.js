import '../App.css';
import React from 'react';
import ScoreInfo from '../components/ScoreInfo';
import Chart from '../components/Chart';
import Calendar from '../components/Calendar';
import Responses from '../components/Responses';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default function Home() {
	return (
		/* <div>
				<Container fluid>
					<Row className="h-8">
						<Col md lg xl={6}>
							<Calendar />
						</Col>
						<Col md lg xl={6}>
							<Responses />
						</Col>
					</Row>
					<Row className="h-33">
						<Col md lg xl={6}>
							<ScoreInfo />
						</Col>
					</Row>
					<Row className="h-58">
						<Col md lg xl={6}>
							<Chart />
						</Col>
					</Row>
				</Container>
			</div> */

		<div className="dashboard">
			<div className="gridwrapper">
				<Calendar />
				<ScoreInfo />
				<Chart />
				<Responses />
			</div>
		</div>
	);
}
