import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                                <a href="#" className="footerLink">
                                    About
                                </a>
                                <a href="#" className="footerLink">
                                    Contact
                                </a>
                                <a href="#" className="footerLink">
                                    Terms
                                </a>
                                <a href="#" className="footerLink">
                                    Privacy
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default App;