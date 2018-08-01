import axios from 'axios';
import {API_KEY} from '../config';

const url = 'http://api.openweathermap.org/data/2.5/forecast';

const getForcast = (latitude,longitude) => {
  return axios.get(`${url}?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
  .then(response => response.data)
  .catch(e => {
    throw e;
  });
};

export default getForcast;