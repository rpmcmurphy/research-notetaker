import React from 'react';
import { Row, Col } from 'react-bootstrap';

const LicenseComponent = () => {
    return (
        <Row>
            <Col md={6}>
                <h5>License</h5>
                <p>
                    Distributed under the MIT License. See LICENSE.txt for more information.
                </p>
            </Col>
        </Row>
    );
};

export default LicenseComponent;