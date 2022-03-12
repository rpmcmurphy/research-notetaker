import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListGroup, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './AllComponentsStyles.scss';

import topics from '../api/topics';
import SpinnerComponent from '../common/SpinnerComponent';
import Pagination from './accessory-components/PaginationComponent';

const TopicsComponent = () => {

    const location = useLocation();
    const messageText = location.state;
    
    const [topicList, setTopicList] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(1);
    const [pageTotal, setPageTotal] = React.useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let active = true;

        const getTopics = async () => {
            try {
                const response = await topics.getTopics(currentPage);
                if (!active) { return }
                setPageTotal(response.data.data.total);
                setPageSize(response.data.data.per_page);
                setTopicList(response.data.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getTopics();
        return () => { active = false }
    }, [currentPage]);

    return (
        <>
            <h5>Topics</h5>
            {
                (messageText != null && messageText.message != '') ? <div className="alert alert-success" role="alert">
                    { messageText.message }
                </div> : ''
            }
            {
                (topicList.length === 0) ? <SpinnerComponent /> : <Row>
                        <Col>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={pageTotal}
                                pageSize={pageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />

                            <ListGroup className='mt-3'>
                                {topicList.map(item => {
                                    return (
                                        <ListGroup.Item className='d-flex justify-content-between align-items-center' key={item.id}>
                                            <h5 className='list-table-item mr-auto mb-0'>{item.name}</h5>
                                            <div className='d-flex'>
                                                <LinkContainer to={`/topic-edit/${item.id}`}>
                                                    <Nav.Link className='list-nav-link'>View</Nav.Link>
                                                </LinkContainer>
                                                <LinkContainer to={`/topic-delete/${item.id}`}>
                                                    <Nav.Link className='list-nav-link'>Delete</Nav.Link>
                                                </LinkContainer>
                                            </div>
                                        </ListGroup.Item>
                                    );
                                }
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
            }
        </>
    );
};

export default TopicsComponent;