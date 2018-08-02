import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {DayDiv,CalDate,DayOfWeek,Condition,High,Low} from '../styles/Day';

const imgURL = 'https://openweathermap.org/img/w/';

/**
 * @description converts from kevin to Fahrenheit or Celsius 
 * @param {number} kevin 
 * @param {bool} isFahrenheit 
 * @return {string} the temp in Fahrenheit or Celsius 
 */
function convertWeather(kevin, isFahrenheit){
  if(isFahrenheit){
    return Math.round(kevin * 9/5 - 459.67)+'°F';
  }
  return Math.round(kevin - 273.15)+'°C';
}

const Day = (props) => {
  let {dt_txt,weather,main} = props;
  let date = moment(dt_txt);
  console.log(props)
  return (
    <DayDiv>
      <CalDate>{date.format('MM/DD')}</CalDate>
      <DayOfWeek>{date.isSame(moment(), 'day') ? 'Today':date.toLocaleString().substring(0,3)}</DayOfWeek>
      <Condition><img src={`${imgURL}${weather[0].icon}.png`} alt={weather[0].main}/></Condition>
      <High>{convertWeather(main.high_temp,props.isFahrenheit)}</High>
      <Low>{convertWeather(main.low_temp,props.isFahrenheit)}</Low>
    </DayDiv>
  );
}
Day.propTypes = {
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
  isFahrenheit: PropTypes.bool.isRequired
};
export default Day;
