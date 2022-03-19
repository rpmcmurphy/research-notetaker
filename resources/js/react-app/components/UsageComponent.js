import React from 'react';
import { Row, Col } from 'react-bootstrap';

const UsageComponent = () => {
    return (
        <Row>
            <Col md={6}>
                <h5>Usage</h5>
                <p>
                    This application can be used to build a personal database on topics you add, plus the details on each topic. First, add TOPIC like interviews, personalities, articles etc. then add any number of DETAIL under each topic. That way you will be able to track/bookmark things and some details about it for later reference. It will serve as a bookmark for you, with unlimited number or amount of detail you want to save for later reference. Enjoy!
                </p>
            </Col>
        </Row>
    );
};

export default UsageComponent;