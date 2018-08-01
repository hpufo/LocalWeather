import React, { Component } from 'react';
import {API_KEY} from '../config';
import axios from 'axios';
import moment from 'moment';
import DumbApp from './DumbApp';

const url = 'http://api.openweathermap.org/data/2.5/forecast';
//think about cases where I fail to get new data from the api but still have data cached
class App extends Component {
  state = {
    message: 'loading...',
    response: {},
    isFahrenheit: true
  };

  componentDidMount(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        let {latitude,longitude} = position.coords;
        
        if(!localStorage.getItem('response') || this.isOverTenMinsOld(this.getCachedResponse().timestamp)){
          this.getAndSaveData(latitude,longitude);
        }
        else{
          console.log('use cached');
          this.setState({response: this.getCachedResponse(), message: ''});
        }
      },
      (error) => {
        this.setState('couldn\'t get location attempting to find through IP');
        this.ipLookup()
      });
    }
    else{
      this.setState({message: 'geolocation is not enabled on this browser, attempting to get location from IP'});
      this.ipLookup()
    }
  }
  ipLookup(){
    return axios.get('http://ip-api.com/json')
      .then((response) => {
        let {lat, lon} = response.data;
        this.getAndSaveData(lat, lon);
      })
      .catch((error) => {
        this.setState({message: 'Couldnt get your location via geolocation and your IP address, you can\'t use this app without your location'});
        //Inform the user that they are shit out of luck
      });
  }
  getAndSaveData(latitude,longitude){
    this.getData(latitude,longitude)
          .then((json) => this.saveResponse(json));
  }
  getData(latitude,longitude){
    console.log('fresh data');
    return axios.get(`${url}?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
      .then(response => response.data)
      .catch(e => {
        //Assed out if you get over here
        this.setState({message: 'couldn\'t get forcast from API, check console for more details'});
        console.log(e);
      });
  }
  isOverTenMinsOld(datetime){
    return moment(datetime).diff(moment(), 'minutes') <= -10;
  }
  saveResponse(json){
    json.timestamp = moment();
    this.setState({response: json});
    localStorage.setItem('response', JSON.stringify(json));
  }
  getCachedResponse(){
    return JSON.parse(localStorage.getItem('response'));
  }
  render() {
    return <DumbApp {...this.state} />;
  }
}

export default App;
