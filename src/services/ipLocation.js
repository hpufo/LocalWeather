import axios from 'axios';

/**
 * @description get's the user's location using the ipAPI
 * @returns {Promise}
 * @throws error
 */
const getLocationFromIP = () => {
  return axios.get('https://ip-api.com/json')
      .then((response) => {
        let {lat, lon} = response.data;
        return{lat, lon};
      })
      .catch((error) => {
        throw error;
      });
};

export default getLocationFromIP;