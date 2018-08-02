import React from 'react';
import moment from 'moment';
import Day from './Day';
import {FiveDayDiv} from '../styles/FiveDay';

function renderDays(props){
  let {list} = props.response;
  let i = 0;
  let filtered = [list[i]];                           //Grabs the first weather report for the day
  filtered[i].main.high_temp = list[i].main.temp_max; //Init's it's temp high
  filtered[i].main.low_temp = list[i].main.temp_min;  //Inti it's temp low

  list.map((item) => {
    if(moment(filtered[i].dt_txt).isSame(moment(item.dt_txt), 'day')){
      if(filtered[i].main.high_temp < item.main.temp_max) filtered[i].main.high_temp = item.main.temp_max;
      if(filtered[i].main.low_temp > item.main.temp_min) filtered[i].main.low_temp = item.main.temp_min;
    }
    else{
      i++;
      item.main.high_temp = item.main.temp_max;
      item.main.low_temp = item.main.temp_min;
      filtered.push(item);
    }
    return item;
  });
  console.log(filtered[0].main.high_temp)
  return filtered.map((item, index) => <Day {...item} isFahrenheit={props.isFahrenheit} key={index} />);
}

const FiveDay = (props) => {
  return (
    <FiveDayDiv>
      {renderDays(props)}
    </FiveDayDiv>
  );
};

export default FiveDay;
