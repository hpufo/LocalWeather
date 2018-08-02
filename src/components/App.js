import React, { Component } from 'react';
import moment from 'moment';
import DumbApp from './DumbApp';
import getForcast from '../services/openWeatherMap';
import getLocationFromIP from '../services/ipLocation';

class App extends Component {
  //Init state
  state = {
    message: 'loading...',
    response: {},
    isFahrenheit: true
  };

  componentDidMount(){
    if('geolocation' in navigator){                                         //Feature detect geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        let {latitude,longitude} = position.coords;
        let cachedResponse = this.getCachedResponse();
        //If the response isn't in local storage or the response in storage is over 10 mins old
        if(!localStorage.getItem('response') || this.isOverTenMinsOld(cachedResponse.timestamp)){
          this.getAndSaveData(latitude,longitude);
        }
        else{
          console.log('using cached data');
          this.setState({response: cachedResponse, message: ''});
        }
      },
      (error) => {          //Failed to get user location via geolocation
        this.setState('couldn\'t get location attempting to find through IP');
        this.ipLookup()
      });
    }
    else{       //geolocation is not avaiable
      this.setState({message: 'geolocation is not enabled on this browser, attempting to get location from IP'});
      this.ipLookup()
    }
  }
  /**
   * @description attempt to get the user's IP address from their IP address
   */
  ipLookup(){
    getLocationFromIP()
      .then((response) => {
        console.log('using ip location infomation');
        let {lat, lon} = response;
        this.getAndSaveData(lat, lon);
      })
      .catch((e) => {
        console.log(e.message);
        let cachedResponse = this.getCachedResponse();
        if(cachedResponse){
          this.setState({response: cachedResponse, message: ''});
          console.log('Failed to get location through IP, using cached data');
        }
        else{
          this.setState({message: 'Couldnt get your location via geolocation and your IP address, and you have no weather data saved. Sorry you can\'t use this app.'});
          console.log(e.message);
        }
      });
  }
  /**
   * @description tries to get the data from the OpenWeatherAPI and save it to local storage
   * @param {number} latitude 
   * @param {number} longitude 
   */
  getAndSaveData(latitude,longitude){
    getForcast(latitude,longitude)
          .then((json) => {
            console.log('got data from API');
            this.saveResponse(json)
          })
          .catch((e) => {
            this.setState({message: 'couldn\'t get forcast from API, check console for more details'});
            console.log(e.message);
          });
  }
  /**
   * @description checks the datetime passed was over 10 minutes ago
   * @param {*} datetime a datetime
   * @returns {boolean}
   */
  isOverTenMinsOld(datetime){
    return moment(datetime).diff(moment(), 'minutes') <= -10;
  }
  /**
   * @description update the state with the response and adds it to local storage
   * @param {object} json the json response from the api
   */
  saveResponse(json){
    //append a timestamp to know if 10 mins have passed since you last got a response
    json.timestamp = moment();
    this.setState({response: json});
    //turns the json response to a string so it can be saved in local storage
    localStorage.setItem('response', JSON.stringify(json));
  }
  /**
   * @description gets the response from localStorage
   * @returns {object} json response
   */
  getCachedResponse(){
    //Gets the response from local storage and parse it back into json
    return JSON.parse(localStorage.getItem('response'));
  }
  render() {
    return <DumbApp {...this.state} />;
  }
}

export default App;
