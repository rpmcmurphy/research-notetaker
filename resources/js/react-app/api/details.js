import apiClient from './api';

const getAllDetails = () => apiClient.get('/detail-list');
const getDetails = (currentPage) => apiClient.get(`/detail-list/${currentPage}`);
const getDetailsByTopic = (topicId, currentPage) => apiClient.get(`/topic/${topicId}/?page=${currentPage}`);
const getDetail = (id) => apiClient.get(`/detail/${id}`);
const addDetail = (formData) => apiClient.post(`/detail-add`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
const updateDetail = (formData) => apiClient.post(`/detail-update`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }});
const deleteFile = (formData) => apiClient.post('/delete-file', formData);
const deleteDetail = (id) => apiClient.get(`/detail-delete/${id}`);

const getAllReactSelectTopics = () => apiClient.get('/topic-list-react-select');


const test = (files_images) => {
    return apiClient.post('/test-file-upload', files_images);
};

export default {
    getAllDetails,
    getDetails,
    getDetailsByTopic,
    getDetail,
    addDetail,
    updateDetail,
    deleteFile,
    deleteDetail,
    getAllReactSelectTopics,
    test
};