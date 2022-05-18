import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import '../App.css';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function TopBar() {
	return (
		<Navbar expand="sm">
			<Container>
				<Navbar.Brand href="/">NPS</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						<LinkContainer to="/">
							<Nav.Link>Dashboard</Nav.Link>
						</LinkContainer>
						<LinkContainer to="embed-survey">
							<Nav.Link>Embed survey</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
