import React from 'react';
import PropTypes from 'prop-types';
import FiveDay from './FiveDay';
import {AppDiv,Header,Message} from '../styles/App';

const DumbApp = (props) => {
  if(props.response.city){
    let {name,country} = props.response.city;
    return (
      <AppDiv>
        <Header>{`Five day forcast for: ${name}, ${country}`}</Header>
        <FiveDay response={props.response} isFahrenheit={country === 'US'}/>
      </AppDiv>
    );
  } else {
    return <Message>{props.message}</Message>;
  }
};
DumbApp.propTypes = {
  message: PropTypes.string.isRequired,
  response: PropTypes.shape({
    cod: PropTypes.string,
    message: PropTypes.number,
    cnt: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.shape({
      dt: PropTypes.number,
      main: PropTypes.shape({
        temp: PropTypes.number,
        temp_min: PropTypes.number,
        temp_max: PropTypes.number,
        pressure: PropTypes.number,
        sea_level: PropTypes.number,
        grnd_level: PropTypes.number,
        humidity: PropTypes.number,
        temp_kf: PropTypes.number,
      }),
      weather: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            main: PropTypes.string,
            description: PropTypes.string,
            icon: PropTypes.string,
          })),
      clouds: PropTypes.shape({
          all: PropTypes.number,
      }),
      wind: PropTypes.shape({
          speed: PropTypes.number,
          deg: PropTypes.number
      }),
      rain: PropTypes.shape({
        '3h': PropTypes.number
      }),
      sys:PropTypes.shape({
          pod: PropTypes.string
      }),
      dt_txt: PropTypes.string,
    })),
    city: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      coord: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
      country: PropTypes.string,
      population: PropTypes.number,
    })
  }).isRequired,
  isFahrenheit: PropTypes.bool.isRequired
};
export default DumbApp;
