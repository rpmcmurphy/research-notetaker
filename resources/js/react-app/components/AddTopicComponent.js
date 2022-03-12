import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import topicsApi from '../api/topics';

function AddTopicComponent() {

    const [topicName, setTopicName] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (topicName != null && topicName != "") {
            setIsAdding(true);

            const addNewTopic = async () => {
                try {
                    const response = await topicsApi.addTopic(topicName);

                    if(response.data.status === 'success') {
                        setMessage(response.data.message);
                        setTopicName("");
                        setIsAdding(false);
                        navigate("/topics", { state: { message: response.data.message } });
                    } else {
                        setIsAdding(false);
                        setError(true);
                        setMessage(response.data.message);
                    }

                } catch (error) {
                    console.log(error);
                }
            };
            addNewTopic();
        } else {
            alert("Please add a topic name!");
        }
    }

    return (
        <Row>
            <Col>
                <Row>
                    <Col md={6}>
                        {
                            (error && message) && <div className="alert alert-danger">{message}</div>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h5>Add Topic</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formTopicName">
                                    <Form.Label>Topic name</Form.Label>
                                    <Form.Control value={topicName} onChange={(e) => setTopicName(e.target.value)} type="text" placeholder="Enter topic name" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AddTopicComponent;