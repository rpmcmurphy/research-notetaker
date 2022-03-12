import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import topicsApi from '../../api/topics';

function SearchFormComponent() {

    const [q, setQ] = useState("");
    const [selectedTopic, setSelectedTopic] = useState('');
    const [allTopics, setAllTopics] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
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
        return () => { active = false }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/search", { state: { searchTerm: q, topicId: selectedTopic } });
    }

  return (
    <Row>
        <Col md={6}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formSearchTerm">
                        {/* <Form.Label>Search term</Form.Label> */}
                        <Form.Control value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Enter search term" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formTopic">
                        <Form.Select size="md" onChange={(e) => {
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
            </Form>
        </Col>
    </Row>
  )
}

export default SearchFormComponent;