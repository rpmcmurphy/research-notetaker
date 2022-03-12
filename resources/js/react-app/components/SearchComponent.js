import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

import './AllComponentsStyles.scss';

import searchApi from '../api/searchResult';
import topicsApi from '../api/topics';
import ContentWrapperComponent from './hocs/ContentWrapperComponent';
import SpinnerComponent from '../common/SpinnerComponent';

const SearchComponent = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [q, setQ] = useState("");
    const [selectedTopic, setSelectedTopic] = useState('');
    const [items, setItems] = useState([]);
    const [allTopics, setAllTopics] = useState([]);

    const location = useLocation();
    const searchData = location.state;

    useEffect(() => {
        // Get all topics for the dropdown 
        let active = true;

        const getTopics = async () => {
            try {
                const response = await topicsApi.getAllTopics();
                if (!active) { return }
                setAllTopics(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getTopics();

        // Get search result is search term and topicId is provided
        if (searchData != null && (searchData.searchTerm || searchData.topicId)) {
            setQ(searchData.searchTerm);
            setSelectedTopic(searchData.topicId);
            setIsLoading(true);

            const generateSearchResult = async () => {
                try {
                    const response = await searchApi.getSearchResult(searchData.searchTerm, searchData.topicId);
                    if (!active) { return }
                    setItems(response.data.details);
                    setIsLoaded(true);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            };
            generateSearchResult();
        }
        // const generateSearchResult = async () => {
        //     setIsLoading(true);
        //     try {
        //         const response = await searchApi.getSearchResult(q, selectedTopic);
        //         if (!active) { return }
        //         setIsLoading(false);
        //         setIsLoaded(true);
        //         setItems(response.data.details);
        //     } catch (error) {
        //         setIsLoading(false);
        //         setIsLoaded(true);
        //         setError(error);
        //     }
        // };

        return () => { active = false }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await searchApi.getSearchResult(q, selectedTopic);
            setIsLoaded(true);
            setIsLoading(false);
            setItems(response.data.details);
        } catch (error) {
            setIsLoading(false);
            setIsLoaded(true);
            console.log(error);
        }
    }

    const prepareResult = () => {
        if (error) {
            return <>{error.message}</>;
        } else if (isLoading) {
            return <SpinnerComponent />;
        } else {
            return (
                <>
                    {
                        (items.length > 0) ? <ListGroup className='mt-3'>
                            <h5>Search results</h5>
                            {items.map(item => {
                                return (
                                    <ListGroup.Item className='d-flex justify-content-between align-items-center' key={item.id}>
                                        <h5 className='list-table-item mr-auto mb-0'>{item.details_name}</h5>
                                        <div className='d-flex'>
                                            <LinkContainer to={`/detail-edit/${item.id}`}>
                                                <Nav.Link className='list-nav-link'>View</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to={`/detail-delete/${item.id}`}>
                                                <Nav.Link className='list-nav-link'>Delete</Nav.Link>
                                            </LinkContainer>
                                        </div>
                                    </ListGroup.Item>
                                );
                            }
                            )}
                        </ListGroup> : <h5>No results found</h5> 
                    }
                </>
            );
        }
    }

    return (
        <ContentWrapperComponent>
            <Row>
                <Col md={6}>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formSearchTerm">
                                {/* <Form.Label>Search term</Form.Label> */}
                                <Form.Control value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Enter search term" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formTopic">
                                {/* <Form.Label>Topic</Form.Label> */}
                                {/* {e => setSelectedTopic([].slice.call(e.target.selectedOptions).map(item => item.value))} */}
                                <Form.Select size="md" value={selectedTopic} onChange={(e) => {
                                    setSelectedTopic(e.target.value);
                                }}>
                                    <option value="" key="select_topic">Select topic</option>
                                    {allTopics && allTopics.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formTopic">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form.Group>
                        </Row>

                        {/* <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" checked label="Load in a separate page" id="formGridCheckbox2"/>
                </Form.Group> */}
                    </Form>

                    {
                        prepareResult()
                    }
                </Col>
            </Row>
        </ContentWrapperComponent>
    );
};

export default SearchComponent;