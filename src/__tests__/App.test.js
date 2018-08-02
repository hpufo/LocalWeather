import React from 'react';
import {shallow} from 'enzyme';
import App from '../components/App';
import * as getForcast from '../services/openWeatherMap';
import * as getLocationFromIP from '../services/ipLocation';

describe('App', () => {
  beforeEach(() => {
    getForcast.default = jest.fn((latitude,longitude) => Promise.resolve({}));
    getLocationFromIP.default = jest.fn(() => Promise.resolve({lat:45,long:45}));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
  it('get\'s the ip from the users ip', () => {
    const wrapper = shallow(<App />);
    expect(getLocationFromIP.default).toBeCalled();
    expect(localStorage.setItem).toBeCalled();
  });
  it('stores the response into localStorage', () => {
    const wrapper = shallow(<App />);
    expect(localStorage.setItem).toBeCalled();
  });
});