import axios from 'axios';
import configuration from '../config';

axios.defaults.baseURL = configuration.BASE_URL;

export default axios;
