import axios from 'axios';

const getLocationFromIP = () => {
  return axios.get('http://ip-api.com/json')
      .then((response) => {
        let {lat, lon} = response.data;
        return{lat, lon};
      })
      .catch((error) => {
        throw error;
      });
};

export default getLocationFromIP;