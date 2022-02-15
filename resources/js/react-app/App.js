import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationLinks from './navigation/NavigationLinks';
import NavigationComponent from './navigation/NavigationComponent';

const App = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <NavigationLinks />
                </Col>
            </Row>
            <Row>
                <Col>
                    <NavigationComponent />
                </Col>
            </Row>
        </Container>
    );
};

export default App;