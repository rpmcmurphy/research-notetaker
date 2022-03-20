import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import detailsApi from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';

function AddDetailsComponent() {
    const [allTopics, setAllTopics] = useState([]);
    const [detailName, setDetailName] = useState("");
    const [details, setDetails] = useState("");
    const [topicIds, setTopicIds] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(false);
    const [errorType, setErrorType] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        const fetchTopics = async () => {
            try {
                const response = await detailsApi.getAllReactSelectTopics();
                if (!active) { return }
                setAllTopics(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopics();
        return () => { active = false }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (detailName != null && detailName != "" && details != null && details != "") {
            setIsAdding(true);

            let topicIdsMapped = [];
            if(topicIds.length != 0) {
                topicIds.map(async (topicId) => {
                    topicIdsMapped.push(topicId.value);
                });
            }

            const addNewDetail = async () => {
                try {
                    const response = await detailsApi.addDetail(detailName, details, topicIdsMapped);

                    if (response.data.status === 'success') {
                        setMessage(response.data.message);
                        setDetailName("");
                        setDetails("");
                        setTopicIds([]);
                        setIsAdding(false);

                        navigate("/details", { state: { message: response.data.message } });
                    } else {
                        setIsAdding(false);
                        setError(true);
                        setErrorType(response.data.type);
                        setMessage(response.data.message);
                    }

                } catch (error) {
                    console.log('error', error);
                }
            };

            addNewDetail();
        } else {
            alert("Please add a detail name and some details!");
        }
    };

    return (
        <Row>
            <Col>
                <Row>
                    <Col md={6}>
                        <h5>Add Topic</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        {
                            isAdding && <SpinnerComponent />
                        }
                        {
                            (error && message && errorType != 'validation') && <div className="alert alert-danger">{message}</div>
                        }
                        {
                            errorType == 'validation' && <ul className="list-unstyled">
                                {
                                    message && message.map((item, index) => {
                                        return <li className="alert alert-danger" key={index}>{item}</li>
                                    })
                                }
                            </ul>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formDetailName">
                                    <Form.Label>Detail name</Form.Label>
                                    <Form.Control value={detailName} onChange={(e) => setDetailName(e.target.value)} type="text" placeholder="Enter detail name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formTopics">
                                    {
                                        allTopics.length > 0 && <Select isMulti options={allTopics} onChange={(selectedOption) => setTopicIds(selectedOption)} />
                                    }

                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formDetails">
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={details} onChange={(e) => setDetails(e.target.value)}  placeholder="Add some details" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formFileUpload" className="mb-3">
                                    <Form.Label>Upload images/files</Form.Label>
                                    <Form.Control type="file" multiple onChange={(e) => setSelectedFiles(e.target.files)} />
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

export default AddDetailsComponent;