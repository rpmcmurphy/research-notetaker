import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import topicApi from '../api/topics';
import SpinnerComponent from '../common/SpinnerComponent';

function UpdateTopicComponent() {

    const navigate = useNavigate();
    const { topicId } = useParams();

    const [topicName, setTopicName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");



    useEffect(() => {
        let active = true;

        const fetchTopic = async () => {
            try {
                const response = await topicApi.getTopic(topicId);
                if (!active) { return }
                setTopicName(response.data.data.name);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopic();
        return () => { active = false }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (topicName != null && topicName != "") {
            setIsUpdating(true);

            const updateTopicInfo = async () => {
                try {
                    const response = await topicApi.updateTopic(topicId, topicName);

                    if (response.data.status === 'success') {
                        setMessage(response.data.message);
                        setIsUpdating(false);
                        navigate("/topics", { state: { message: response.data.message } });
                        console.log(response);
                    } else {
                        setIsUpdating(false);
                        setError(true);
                        setMessage(response.data.message);
                    }

                } catch (error) {
                    console.log(error);
                }
            };

            updateTopicInfo();
        } else {
            alert("Please add a topic name!");
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col md={6}>
                            <h5>Update Topic</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {
                                (error && message) && <div className="alert alert-danger">{message}</div>
                            }

                            {
                                isUpdating && <SpinnerComponent />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form onSubmit={(e) => { e.preventDefault(); }}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formTopicName">
                                        <Form.Label>Topic name</Form.Label>
                                        <Form.Control value={topicName} onChange={(e) => setTopicName(e.target.value)} type="text" placeholder="Enter topic name" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                            Update
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default UpdateTopicComponent;