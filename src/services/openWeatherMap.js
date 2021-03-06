import axios from 'axios';
import {API_KEY} from '../config';

const url = 'https://api.openweathermap.org/data/2.5/forecast';

/**
 * @description Get's the five day forcast from the OpenWeatherAPI
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise}
 * @throws error
 */
const getForcast = (latitude,longitude) => {
  return axios.get(`${url}?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
  .then(response => response.data)
  .catch(e => {
    throw e;
  });
};

export default getForcast;