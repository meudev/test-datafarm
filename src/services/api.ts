import axios from 'axios';

const api = axios.create({
    baseURL: 'https://job.minhafazenda.ag',
    headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        'Accept': '*/*'
    }
})

export default api;