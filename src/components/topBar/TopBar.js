import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './topBar.css';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export default function TopBar() {
	return (
		<Navbar
			className="navbar sticky-top shadow-sm color-dark"
			variant="light"
			expand="lg"
		>
			<Container>
				<Navbar.Brand href="/" className="brand">
					NPS Dashboard
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer className="link" to="/">
							<Nav.Link href="#home">Dashboard</Nav.Link>
						</LinkContainer>
						<LinkContainer className="link" to="Settings">
							<Nav.Link href="Settings">Settings</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
