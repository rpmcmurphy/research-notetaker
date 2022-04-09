import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListGroup, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './AllComponentsStyles.scss';

import details from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';
import Pagination from './accessory-components/PaginationComponent';

const DetailsComponent = () => {

    const location = useLocation();
    const messageText = location.state;

    const [detailList, setDetailList] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(1);
    const [pageTotal, setPageTotal] = React.useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let active = true;

        const fetchTopics = async () => {
            try {
                const response = await details.getDetails(currentPage);
                if (!active) { return }
                setPageTotal(response.data.data.total);
                setPageSize(response.data.data.per_page);
                setDetailList(response.data.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopics();
        return () => { active = false }
    }, [currentPage]);

    return (
        <>
            <h5>Details</h5>
            {
                (messageText != null && messageText.message != '') ? <div className="alert alert-success" role="alert">
                    {messageText.message}
                </div> : ''
            }
            {
                (detailList.length === 0) ? <SpinnerComponent /> : <Row>
                    <Col>
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={pageTotal}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />

                        <ListGroup className='mt-3'>
                            {detailList.map(item => {
                                return (
                                    <ListGroup.Item className='d-flex justify-content-between align-items-center' key={item.id}>
                                        <h5 className='list-table-item mr-auto mb-0'>{item.details_name}</h5>
                                        <div className='d-flex'>
                                            <LinkContainer to={`/detail-view/${item.id}`}>
                                                <Nav.Link className='list-nav-link'>View</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to={`/detail-edit/${item.id}`}>
                                                <Nav.Link className='list-nav-link'>Edit</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to={`/detail-delete/${item.id}`}>
                                                <Nav.Link className='list-nav-link bg-danger'>Delete</Nav.Link>
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

export default DetailsComponent;