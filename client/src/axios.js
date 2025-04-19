import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/auth',

})

const googleAuth = async (code) => api.post(`/google`, { code })
export default googleAuth