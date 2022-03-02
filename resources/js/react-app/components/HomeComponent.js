import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ContentWrapperComponent from './hocs/ContentWrapperComponent';
import SidebarComponent from './hocs/SidebarComponent';
import SearchComponent from './SearchComponent';
import TopicsComponent from './TopicsComponent';

const HomeComponent = () => {
    return (
        <ContentWrapperComponent>
            <Row>
                <Col md={6}>
                    <SearchComponent />
                    <TopicsComponent />
                </Col>
                <Col md={6}>
                    <SidebarComponent>
                        Home component sidebar.
                    </SidebarComponent>
                </Col>
            </Row>
        </ContentWrapperComponent>
    );
};

export default HomeComponent;