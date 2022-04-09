import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { BASE_URL } from '../common/global-vars';
import detailApi from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';
import Pagination from './accessory-components/PaginationComponent';

function DetailsListCardComponent() {

    const navigate = useNavigate();
    const { topicId } = useParams();

    const [detailListArr, setDetailListArr] = useState("");
    const [pageSize, setPageSize] = React.useState(1);
    const [pageTotal, setPageTotal] = React.useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let active = true;

        const fetchDetail = async () => {
            try {
                const response = await detailApi.getDetails(currentPage);
                if (!active) { return }
                setPageTotal(response.data.data.total);
                setPageSize(response.data.data.per_page);
                setDetailListArr(response.data.data.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchDetail();

        return () => { active = false }
    }, [currentPage]);

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h5>Your categorized result</h5>
                            <hr className="mb-3" />
                        </Col>
                    </Row>
                    <Row>
                        {detailListArr && detailListArr.length > 0 && detailListArr.map((detail, index) => {
                            return (
                                <Col md={3} key={`detail_${index}`} className="mb-2">
                                    <Card style={{ width: '100%', height: '100%' }}>
                                        {(detail.files_images && detail.files_images.length > 0) ? <Card.Img variant="top" src={`${BASE_URL}/storage/${JSON.parse(detail.files_images)[0]}`} alt={detail.details_name} /> : <Card.Img variant="top" src={`${BASE_URL}/images/research-notes.jpg`} alt={detail.details_name} />}
                                        <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                                            <LinkContainer to={`/detail-view/${detail.id}`}>
                                                <Nav.Link className='p-0'>
                                                    <Card.Title style={{ fontSize: '14px', color: '#000' }}>{detail.details_name}</Card.Title>
                                                </Nav.Link>
                                            </LinkContainer>
                                            <Card.Text style={{ fontSize: '14px' }}>
                                                {detail.details}
                                            </Card.Text>
                                            <div style={{ marginTop: 'auto' }}>
                                                {detail.topics && detail.topics.length > 0 && detail.topics.map((topic, index) => {
                                                    return (
                                                        <LinkContainer to={`/topic/${topic.id}`} key={`topic_${index}`}>
                                                            <Nav.Link className='list-nav-link'>
                                                                {topic.name}
                                                                {index !== detail.topics.length - 1 && `, `}
                                                            </Nav.Link>
                                                        </LinkContainer>
                                                    )
                                                })
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>
                    <Row>
                        <Col>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={pageTotal}
                                pageSize={pageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default DetailsListCardComponent;