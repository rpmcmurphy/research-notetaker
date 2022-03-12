import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import detailsApi from '../api/details';
import SpinnerComponent from '../common/SpinnerComponent';

function DeleteTopicComponent() {

    const navigate = useNavigate();
    const { detailId } = useParams();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {

        let active = true;

        const deleteDetail = async () => {

            if (detailId != null && detailId != "") {
                setIsDeleting(true);

                try {
                    const response = await detailsApi.deleteDetail(detailId);
                    if (!active) { return }

                    if (response.data.status === 'success') {
                        setIsDeleted(true);
                        setIsDeleting(false);
                        setTimeout(() => {
                            navigate("/details");
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

        deleteDetail();
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
                                {isDeleting && <SpinnerComponent />}
                                {isDeleted && <div className="alert alert-success" role="alert">
                                    Detail successfully deleted! Getting back to the details list.
                                </div>}
                            </>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default DeleteTopicComponent;