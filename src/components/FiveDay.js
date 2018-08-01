import React from 'react';
import moment from 'moment';
import Day from './Day';
import {FiveDayDiv} from '../styles/FiveDay';

function renderDays(props){
  let {list} = props.response;
  let filtered = [list[0]]; //Grabs the first weather report for the day
  //Grab the first weather report for each day
  for(let i=1; i<5; i++){
    filtered.push(list.find((item) => moment(filtered.dt_txt).add(i,'days').isSame(moment(item.dt_txt), 'day')));
  }
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
