import apiClient from './api';

const getAllTopics = () => apiClient.get('/topic-list');
const getTopics = (currentPage) => apiClient.get(`/topic-list/${currentPage}`);
const getTopic = (id) => apiClient.get(`/topic/${id}`);
const addTopic = (topicName) => apiClient.post('/topic-add', { topic_name: topicName });
const updateTopic = (id, topic_name) => apiClient.post(`/topic-update`, { id, topic_name });
const deleteTopic = (id) => apiClient.get(`/topic-delete/${id}`);

export default {
    getAllTopics,
    getTopics,
    getTopic,
    addTopic,
    updateTopic,
    deleteTopic
};