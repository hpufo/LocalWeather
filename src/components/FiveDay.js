import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Day from './Day';
import {FiveDayDiv} from '../styles/FiveDay';
/**
 * @description This function goes through the list and grab the first of each reading
 * and compares it with the rest of the readings for the day. Appending it to the object
 * and returning the filtered array
 * @param {*} props 
 * @returns {Array} returns the filtered array containig the five day forcast
 */
function renderDays(props){
  let {list} = props.response;
  let i = 0;
  let filtered = [list[i]];                           //Grabs the first weather report for the day
  filtered[i].main.high_temp = list[i].main.temp_max; //Init's it's temp high
  filtered[i].main.low_temp = list[i].main.temp_min;  //Inti it's temp low

  //Loop through the list
  list.map((item) => {
    //check to see if the current reading is the same day as the current filtered array item
    if(moment(filtered[i].dt_txt).isSame(moment(item.dt_txt), 'day')){
      //Compares the high and low reading adding it to the current filted item
      if(filtered[i].main.high_temp < item.main.temp_max) filtered[i].main.high_temp = item.main.temp_max;
      if(filtered[i].main.low_temp > item.main.temp_min) filtered[i].main.low_temp = item.main.temp_min;
    }
    else{ //If the item is a reading for a new day
      i++;
      //Init the new item's high and low readings and adding it to the filtered array
      item.main.high_temp = item.main.temp_max;
      item.main.low_temp = item.main.temp_min;
      filtered.push(item);
    }
    return item;
  });
  return filtered.map((item, index) => <Day {...item} isFahrenheit={props.isFahrenheit} key={index} />);
}

const FiveDay = (props) => {
  return (
    <FiveDayDiv>
      {renderDays(props)}
    </FiveDayDiv>
  );
};

FiveDay.propTypes = {
  response: PropTypes.shape({
    cod: PropTypes.string,
    message: PropTypes.number,
    cnt: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.shape({
      dt: PropTypes.number,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
        pressure: PropTypes.number,
        sea_level: PropTypes.number,
        grnd_level: PropTypes.number,
        humidity: PropTypes.number,
        temp_kf: PropTypes.number,
      }).isRequired,
      weather: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            main: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          })).isRequired,
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
      dt_txt: PropTypes.string.isRequired,
    })).isRequired,
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
export default FiveDay;
