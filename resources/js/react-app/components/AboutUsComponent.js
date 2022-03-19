import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AboutUsComponent = () => {
    return (
        <Row>
            <Col md={6}>
                <h5>About</h5>
                <p>
                    Research note-taking application built with Laravel and React.
                </p>
                <p>
                    A project to help take notes on different topics and browse through later for convenience.
                </p>
            </Col>
        </Row>
    );
};

export default AboutUsComponent;