import { set } from 'lodash';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import  topics from '../api/topics';
import SpinnerComponent from '../common/SpinnerComponent';

const TopicsComponent = () => {

    const [topicList, setTopicList] = React.useState([]);

    React.useEffect(() => {
        getTopics();
    }, []);

    const getTopics = async () => {
        try {
            const response = await topics.getTopics();
            setTopicList(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h5>Topics</h5>
            {!topicList.length ? <SpinnerComponent /> : topicList.map((topic, index) => {
                return (
                    <ListGroup>
                        <ListGroup.Item key={index}>{topic.name}</ListGroup.Item>
                    </ListGroup>
                );
            }) }
        </div>
    );
};

export default TopicsComponent;