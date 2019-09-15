import React, { useState, useEffect } from 'react';
import moment from 'moment';
import getForcast from '../services/openWeatherMap';
import getLocationFromIP from '../services/ipLocation';
import {AppDiv,Header,Message} from '../styles/App';
import FiveDay from './FiveDay';

const App = () => {
  const [message, setMessage] = useState('loading...');
  const [response, setResponse] = useState({city: false});

  const isOverTenMinsOld = (datetime) => moment(datetime).diff(moment(), 'minutes') <= -10;
  const getCachedResponse = () => JSON.parse(localStorage.getItem('response'));
  const saveResponse = (json) => {
    //append a timestamp to know if 10 mins have passed since you last got a response
    json.timestamp = moment();
    setResponse(json);
    //turns the json response to a string so it can be saved in local storage
    localStorage.setItem('response', JSON.stringify(json));
    console.log('response saved');
  };
  /**
   * @description tries to get the data from the OpenWeatherAPI and save it to local storage
   * @param {number} latitude 
   * @param {number} longitude 
   */
  const getAndSaveData = (latitude,longitude) => {
    getForcast(latitude,longitude)
      .then((json) => {
        console.log('got data from API');
        saveResponse(json);
      })
      .catch((e) => {
        setMessage('couldn\'t get forcast from API, check console for more details');
        console.log(e.message);
      });
  };
  /**
   * @description attempt to get the user's IP address from their IP address
   */
  const ipLookup = () => {
    getLocationFromIP()
      .then((response) => {
        console.log('using ip location infomation');
        let {lat, lon} = response;
        getAndSaveData(lat, lon);
      })
      .catch((e) => {
        console.log(e.message);
        let cachedResponse = getCachedResponse();
        if(cachedResponse){
          setResponse(cachedResponse);
          setMessage('');
          console.log('Failed to get location through IP, using cached data');
        }
        else{
          setMessage('Couldnt get your location via geolocation and your IP address, and you have no weather data saved. Sorry you can\'t use this app.');
          console.log(e.message);
        }
      });
  };
  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        let {latitude,longitude} = position.coords;
        let cachedResponse = getCachedResponse();
        //If the response isn't in local storage or the response in storage is over 10 mins old
        if(!localStorage.getItem('response') || isOverTenMinsOld(cachedResponse.timestamp)){
          getAndSaveData(latitude,longitude);
        }
        else{
          console.log('using cached data');
          setResponse(cachedResponse);
          setMessage('');
        }
      },
      (error) => {          //Failed to get user location via geolocation
        setMessage('couldn\'t get location attempting to find through IP');
        ipLookup()
      });
    }
    else{       //geolocation is not avaiable
      setMessage('geolocation is not enabled on this browser, attempting to get location from IP');
      ipLookup()
    }
  },[]);
  
  if(response.city){
    let {name,country} = response.city;
    return (
      <AppDiv>
        <Header>{`Five day forcast for: ${name}, ${country}`}</Header>
        <FiveDay response={response} isFahrenheit={country === 'US'}/>
      </AppDiv>
    );
  } else {
    return <Message>{message}</Message>;
  }
};

export default App;
