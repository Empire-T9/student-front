import axios from 'axios';

const API_HOST = `${process.env.API_HOST}`;
axios.defaults.baseURL = API_HOST;

const authAxios = axios.create();

export { authAxios };
