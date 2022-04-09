import { create } from 'apisauce';

import { BASE_URL } from '../common/global-vars';

const appCLient = create({
    baseURL: `${BASE_URL}api/`,
    headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    // timeout: 10000,
    // responseType: 'json',
    // maxRedirects: 5
});

export default appCLient;