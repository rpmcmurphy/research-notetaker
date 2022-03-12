import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import topicApi from '../api/topics';
import SpinnerComponent from '../common/SpinnerComponent';

function DeleteTopicComponent() {

    const navigate = useNavigate();
    const { topicId } = useParams();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {

        let active = true;

        const deleteTopic = async () => {

            if (topicId != null && topicId != "") {
                setIsDeleting(true);

                try {
                    const response = await topicApi.deleteTopic(topicId);
                    if (!active) { return }

                    if (response.data.status === 'success') {
                        setIsDeleted(true);
                        setIsDeleting(false);
                        setTimeout(() => {
                            navigate("/topics");
                        }, 1200);
                    } else {
                        setIsDeleting(false);
                        setError(true);
                        setMessage('There was an error. Please try again later.');
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        };

        deleteTopic();
        return () => { active = false }
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col xs={12}>
                            <h5>Delete topic</h5>
                            {
                                (message != null && message != '') && error ? <div className="alert alert-danger" role="alert">
                                    {message}
                                </div> : ''
                            }
                            <>
                                { isDeleting && <SpinnerComponent /> }
                                { isDeleted && <div className="alert alert-success" role="alert">
                                    Topic successfully deleted! Getting back to the topics list.
                                </div> }
                            </>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default DeleteTopicComponent;