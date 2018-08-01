import React from 'react';
import FiveDay from './FiveDay';
import {AppDiv,Header,Message} from '../styles/App';

const DumbApp = (props) => {
  if(props.response.city){
    let {name,country} = props.response.city;
    return (
      <AppDiv>
        <Header>{`Five day forcast for: ${name}, ${country}`}</Header>
        <FiveDay response={props.response} isFahrenheit={props.isFahrenheit}/>
      </AppDiv>
    );
  } else {
    return <Message>{props.message}</Message>;
  }
};

export default DumbApp;
