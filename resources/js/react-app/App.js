import React from 'react';

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import "./App.scss";

import NavigationLinks from './navigation/NavigationLinks';
import NavigationComponent from './navigation/NavigationComponent';

const App = () => {
    return (
        <>
            <div className="navWrapper">
                <Container fluid>
                    <Row>
                        <Col>
                            <NavigationLinks />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col>
                        <NavigationComponent />
                    </Col>
                </Row>
            </Container>
            <div className="footerWrapper">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="footer">
                                <LinkContainer to="/about-us">
                                    <Nav.Link className="footerLink">About</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/usage">
                                    <Nav.Link className="footerLink">Usage</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/license">
                                    <Nav.Link className="footerLink">License</Nav.Link>
                                </LinkContainer>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default App;