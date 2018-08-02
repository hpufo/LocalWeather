import React from 'react';
import FiveDay from '../components/FiveDay';
import {shallow} from 'enzyme';
import Day from '../components/Day';
import response from '../__mocks__/response.json';

function setup(){
  const props = response;
  const wrapper = shallow(<FiveDay response={response} isFahrenheit={true}/>);
  return {props, wrapper};
}
describe('FiveDay', () => {
  it('renders without crashing', () => {
    const {wrapper} = setup();
    expect(wrapper.find('FiveDayDiv').exists()).toBe(true);
  });
  it('renders five days', () => {
    const {wrapper} = setup();
    expect(wrapper.find(Day).length).toBe(5);
  });
  //it('', () => {});
});