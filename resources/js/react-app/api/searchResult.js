import apiClient from './api';

// Get search result by serachTerma and topicId
const getSearchResult = (searchTerm, topicId) => apiClient.post('/search-result', { searchTerm, topicId });

export default {
    getSearchResult,
};