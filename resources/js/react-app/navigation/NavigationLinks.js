import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

const NavigationLinks = () => {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Research notetaker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/search">
                                <Nav.Link>Search</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/topics">
                                <Nav.Link>Topics</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/add-topic">
                                <Nav.Link>Add topic</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/details">
                                <Nav.Link>Details</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/details-cards">
                                <Nav.Link>Details cards</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/add-detail">
                                <Nav.Link>Add Detail</Nav.Link>
                            </LinkContainer>
                            {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}
                            {/* <Nav.Link as={Link} to="/test">Test</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">One</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Two</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavigationLinks;