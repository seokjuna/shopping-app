import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
    '' : 'http://localhost:4000'    
})

axiosInstance.interceptors.request.use(function (config) {
    // 요청 헤더에 Authorization으로 Bearer token이 같이 요청됨
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
})

export default axiosInstance;