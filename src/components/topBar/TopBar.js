import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./topBar.css";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function TopBar() {
	return (
		<Navbar variant="light" bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/"> NPS Dashboard </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link href="#home">Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="Responses">
							<Nav.Link href="Responses">Responses</Nav.Link>
						</LinkContainer>
						<LinkContainer to="History">
							<Nav.Link href="History">History</Nav.Link>
						</LinkContainer>
						<LinkContainer to="Admin">
							<Nav.Link href="Admin">Admin</Nav.Link>
						</LinkContainer>
						<LinkContainer to="Logout">
							<Nav.Link href="Logout">Logout</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
