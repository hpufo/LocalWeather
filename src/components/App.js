import React, { Component } from 'react';
import moment from 'moment';
import DumbApp from './DumbApp';
import getForcast from '../services/openWeatherMap';
import getLocationFromIP from '../services/ipLocation';

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
        let cachedResponse = this.getCachedResponse();

        if(!localStorage.getItem('response') || this.isOverTenMinsOld(cachedResponse.timestamp)){
          this.getAndSaveData(latitude,longitude);
        }
        else{
          console.log('using cached data');
          this.setState({response: cachedResponse, message: ''});
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
    getLocationFromIP()
      .then((response) => {
        console.log('using ip location infomation');
        let {lat, lon} = response;
        this.getAndSaveData(lat, lon);
      })
      .catch((e) => {
        let cachedResponse = this.getCachedResponse();
        if(cachedResponse){
          this.setState({response: cachedResponse, message: ''});
          console.log('API call failed, using cached data');
        }
        else{
          this.setState({message: 'Couldnt get your location via geolocation and your IP address, you can\'t use this app without your location'});
          console.log(e.message);
        }
      });
  }
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
