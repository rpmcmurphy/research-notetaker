import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ContentWrapperComponent from './hocs/ContentWrapperComponent';
import SidebarComponent from './hocs/SidebarComponent';
import SearchFormComponent from './accessory-components/SearchFormComponent';
import TopicsComponent from './TopicsComponent';
import DetailsComponent from './DetailsComponent';

const HomeComponent = () => {
    return (
        <ContentWrapperComponent>
            <SearchFormComponent />
            <Row>
                <Col md={6}>
                    <TopicsComponent />
                </Col>
                <Col md={6}>
                    <DetailsComponent />
                </Col>
                <Col md={6}>
                    <SidebarComponent>
                        Enjoy the moment!
                    </SidebarComponent>
                </Col>
            </Row>
        </ContentWrapperComponent>
    );
};

export default HomeComponent;