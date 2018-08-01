import React from 'react';
import moment from 'moment';
import {DayDiv,CalDate,DayOfWeek,Condition,Temp} from '../styles/Day';

const imgURL = 'http://openweathermap.org/img/w/';

function convertWeather(kevin, isFahrenheit){
  if(isFahrenheit){
    return Math.round(kevin * 9/5 - 459.67)+'°F';
  }
  return Math.round(kevin - 273.15)+'°C';
}

const Day = (props) => {
  //console.log('props: ',props)
  let {dt_txt,weather,main} = props;
  let date = moment(dt_txt);
  return (
    <DayDiv>
      <CalDate>{date.format('MM/DD')}</CalDate>
      <DayOfWeek>{date.isSame(moment(), 'day') ? 'Today':date.toLocaleString().substring(0,3)}</DayOfWeek>
      <Condition><img src={`${imgURL}${weather[0].icon}.png`} alt={weather[0].main}/></Condition>
      <Temp>{convertWeather(main.temp_max,props.isFahrenheit)}</Temp>
    </DayDiv>
  );
}

export default Day;
