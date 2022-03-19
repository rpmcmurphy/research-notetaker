import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// State managers 
import { addBird, incrementBird } from '../store/birds/birds.actions';

function ReduxBirdTestComponent(props) {

    const [birdName, setBirdName] = useState('');
    // const birds = useSelector(state => state.birds);
    const dispatch = useDispatch();

    const birds = [...useSelector(state => state.birds)].sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    });

    const handleBirdSubmit = (e) => {
        e.preventDefault();

        dispatch(addBird(birdName));
        setBirdName('');
    }

    return (
        <>
            <Col md={6}>
                <Form onSubmit={handleBirdSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBirdName">
                            <Form.Label>Add Bird</Form.Label>
                            <Form.Control value={birdName} onChange={e => setBirdName(e.target.value)} type="text" placeholder="Enter detail name" />
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
                                <h5 style={{ fontSize: '16px' }}>{bird.name}</h5>
                                <div className="d-flex align-items-center" style={{ marginLeft: '15px' }}>
                                    <h5 style={{ fontSize: '16px', marginRight: '15px' }} className="mb-0">
                                        Views: {bird.views}
                                    </h5>
                                    <button className="btn btn-success" onClick={() => dispatch(incrementBird(bird.name))}>+</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Col>
        </>
    );
}

export default ReduxBirdTestComponent;