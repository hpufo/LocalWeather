import React from 'react';
//import FiveDay from '../components/FiveDay';
import {shallow} from 'enzyme';
import DumbApp from '../components/DumbApp';

const defaultResponse = {
  "city":{
  "id":5110302,
  "name":"Brooklyn",
  "coord":{
    "lat":40.6501,
    "lon":-73.9496
  },
  "country":"US",
  "population":2300664
  }
};

function setup(response = defaultResponse){
  const props = {
    response: response,
    message: 'test'
  };
  const wrapper = shallow(<DumbApp {...props} isFahrenheit={true}/>);
  return {props, wrapper};
}
describe('DumbApp', () => {
  it('renders without crashing', () => {
    const {wrapper} = setup();
    expect(wrapper.find('AppDiv').exists()).toBe(true);
  });
  it('renders the correct data', () => {
    const {wrapper} = setup();
    expect(wrapper.find('Header').childAt(0).text()).toBe('Five day forcast for: Brooklyn, US');
  });
  it('renders the message when there is no data', () => {
    const {wrapper} = setup({});
    expect(wrapper.find('Message').childAt(0).text()).toBe('test');
  });
});