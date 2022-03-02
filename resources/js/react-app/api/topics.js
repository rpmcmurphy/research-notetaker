import apiClient from './api';

const getTopics = () => apiClient.get('/topic-list/1');

export default {
    getTopics
};