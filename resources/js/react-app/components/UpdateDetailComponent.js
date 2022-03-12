import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import { BASE_URL } from '../common/global-vars';
import detailApi from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';

// State managers 
import { addBird, incrementBird } from '../store/birds/birds.actions';

function UpdateDetailComponent() {

    const navigate = useNavigate();
    const { detailId } = useParams();

    const [allTopics, setAllTopics] = useState([]);
    const [detailName, setDetailName] = useState("");
    const [details, setDetails] = useState("");
    const [topicIds, setTopicIds] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [detailFiles, setdetailFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [birdName, setBirdName] = useState('');
    // const birds = useSelector(state => state.birds);
    const dispatch = useDispatch();

    const birds = [...useSelector(state => state.birds)].sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    });

    useEffect(() => {
        let active = true;

        const fetchDetail = async () => {
            try {
                const response = await detailApi.getDetail(detailId);
                if (!active) { return }
                setDetailName(response.data.data.details_name);
                setDetails(response.data.data.details);

                const selected_topics = [];
                response.data.data.topics.map((topic) => {
                    selected_topics.push(topic.id);
                });

                setSelectedTopics(selected_topics);
                setdetailFiles(JSON.parse(response.data.data.files_images));

            } catch (error) {
                console.log(error);
            }
        };

        fetchDetail();

        const fetchAllTopics = async () => {
            try {
                const response = await detailApi.getAllReactSelectTopics();
                if (!active) { return }
                setAllTopics(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllTopics();

        return () => { active = false }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (detailName != null && detailName != "") {
            setIsUpdating(true);

            const updateDetailInfo = async () => {
                try {
                    let formData = new FormData();

                    formData.append('id', detailId);
                    formData.append('details_name', detailName);
                    formData.append('details', details);
                    formData.append('topic_ids', topicIds);

                    selectedFiles && Object.values(selectedFiles).forEach(file => {
                        formData.append("files_images[]", file);
                    });

                    formData.append('_method', 'PATCH'); // To address php bug

                    const response = await detailApi.updateDetail(formData);

                    if (response.data.status === 'success') {
                        setMessage(response.data.message);
                        setIsUpdating(false);
                        navigate("/details", { state: { message: response.data.message } });
                    } else {
                        setIsUpdating(false);
                        setError(true);
                        setMessage(response.data.message);
                        console.log(response);
                    }

                } catch (error) {
                    console.log(error);
                }
            };

            updateDetailInfo();
        } else {
            alert("Please add a detail name and some details!");
        }
    };

    const handleSelectChange = (selectedOption) => {
        const newTopicIds = [];
        selectedOption.map((topic) => {
            newTopicIds.push(topic.value);
        });

        setTopicIds(newTopicIds);

        console.log(newTopicIds);
    }

    const setDefaultValues = (allTopics) => {
        return allTopics.filter(topic => selectedTopics.find(selectedId => selectedId == topic.value)).map(id => id);
    }

    const handleBirdSubmit = (e) => {
        e.preventDefault();

        dispatch(addBird(birdName));
        setBirdName('');
    }

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col md={6}>
                            <h5>Update detail</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {/* {
                                (error && message) && <div className="alert alert-danger">{message}</div>
                            } */}

                            {
                                isUpdating && <SpinnerComponent />
                            }

                            {/* {allTopics && selectedTopics && allTopics.filter(topic => selectedTopics.find(selectedId => selectedId == topic.value)).map(value => (
                                <li>
                                    {value}
                                </li>
                            ))} */}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form onSubmit={(e) => { e.preventDefault(); }}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formDetailName">
                                        <Form.Label>Detail name</Form.Label>
                                        <Form.Control value={detailName} onChange={(e) => setDetailName(e.target.value)} type="text" placeholder="Enter detail name" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formTopics">
                                        {
                                            (allTopics && allTopics.length > 0 ) && <Select isMulti options={allTopics} onChange={handleSelectChange} defaultValue={ setDefaultValues(allTopics) } />
                                        }
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group className="mb-3" controlId="formDetails">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Add some details" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    {
                                        (detailFiles && detailFiles.length > 0) && detailFiles.map((detailFile, idx) => {
                                            return (<Col sm={4} key={idx}><Card>
                                                <Card.Img variant="top" src={`${BASE_URL}/storage/${detailFile}`} alt={detailName} />
                                            </Card></Col>);
                                        })
                                    }
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group controlId="formFileUpload" className="mb-3">
                                        <Form.Label>Upload images/files</Form.Label>
                                        <Form.Control type="file" multiple onChange={(e) => setSelectedFiles(e.target.files) } />
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
                        <Col md={6}>
                            <Form onSubmit={handleBirdSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBirdName">
                                        <Form.Label>Add Bird</Form.Label>
                                        <Form.Control value={ birdName } onChange={ e => setBirdName(e.target.value)} type="text" placeholder="Enter detail name" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                            <hr />
                            <ul className="list-unstyled">
                                {
                                    birds.map(bird => (
                                        <li key={bird.name}>
                                            <h5 style={ { fontSize: '16px' } }>{bird.name}</h5>
                                            <div className="d-flex align-items-center" style={{ marginLeft: '15px' }}>
                                                <h5 style={ { fontSize: '16px', marginRight: '15px' } } className="mb-0">
                                                    Views: { bird.views }
                                                </h5>
                                                <button className="btn btn-success" onClick={() => dispatch(incrementBird(bird.name))}>+</button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default UpdateDetailComponent;