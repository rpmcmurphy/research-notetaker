import apiClient from './api';

const getAllDetails = () => apiClient.get('/detail-list');
const getDetails = (currentPage) => apiClient.get(`/detail-list/${currentPage}`);
const getDetail = (id) => apiClient.get(`/detail/${id}`);
const addDetail = (detailName, details, topicIds) => apiClient.post('/detail-add', { details_name: detailName, details: details, topic_ids: topicIds });
// const updateDetail = (id, details_name, details, topic_ids, files_images) => apiClient.post(`/detail-update`, { id, details_name, details, topic_ids, files_images });
const updateDetail = (formData) => apiClient.post(`/detail-update`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }});
const deleteDetail = (id) => apiClient.get(`/detail-delete/${id}`);

const getAllReactSelectTopics = () => apiClient.get('/topic-list-react-select');


const test = (files_images) => {
    return apiClient.post('/test-file-upload', files_images);
};

export default {
    getAllDetails,
    getDetails,
    getDetail,
    addDetail,
    updateDetail,
    deleteDetail,
    getAllReactSelectTopics,
    test
};