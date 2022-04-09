import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { BASE_URL } from '../common/global-vars';
import detailApi from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';

function ViewDetailComponent() {

    const navigate = useNavigate();
    const { detailId } = useParams();

    const [detailName, setDetailName] = useState("");
    const [details, setDetails] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [detailFiles, setdetailFiles] = useState([]);

    useEffect(() => {
        let active = true;

        const fetchDetail = async () => {
            try {
                const response = await detailApi.getDetail(detailId);
                if (!active) { return }
                setDetailName(response.data.data.details_name);
                setDetails(response.data.data.details);

                setSelectedTopics(response.data.data.topics);
                setdetailFiles(JSON.parse(response.data.data.files_images));

            } catch (error) {
                console.log(error);
            }
        };

        fetchDetail();

        return () => { active = false }
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col md={6}>
                            <h5>{ detailName && detailName }</h5>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            { selectedTopics && detailName.length > 0 && selectedTopics.map((topic, index) => {
                                return (
                                    <LinkContainer to={`/topic/${topic.id}`} key={`topic_${index}`}>
                                        <Nav.Link className='list-nav-link'>
                                            {topic.name}
                                            {index !== selectedTopics.length - 1 && `, `}
                                        </Nav.Link>
                                    </LinkContainer>
                                ) })
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <p className="mt-3">{ details && details }</p>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        {
                            (detailFiles && detailFiles.length > 0) && detailFiles.map((detailFile, idx) => {
                                return (<Col sm={3} key={idx}><Card>
                                    <Card.Img variant="top" src={`${BASE_URL}/storage/${detailFile}`} alt={detailName} />
                                </Card></Col>);
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ViewDetailComponent;