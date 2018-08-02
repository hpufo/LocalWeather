import React from 'react';
import Day from '../components/Day';
import {shallow} from 'enzyme';

function setup(date = "2018-07-31 18:00:00", isFahrenheit=true){
  const props = {
    clouds: {all: 20},
    dt: 1533060000,
    dt_txt: date, //default Tuesday
    isFahrenheit: isFahrenheit,
    main: {
      grnd_level: 1030.49,
      humidity: 72,
      pressure: 1030.49,
      sea_level: 1033.77,
      temp: 299.47,
      temp_kf: -0.01,
      temp_max: 299.472,
      temp_min: 299.47,
      high_temp: 302.472,//85
      low_temp: 297.47//76
    },
    sys: {pod: "d"},
    weather: [{
      description: "few clouds",
      icon: "02d",
      id: 801,
      main: "Clouds"
    }],
    wind: {speed: 2.86, deg: 154.501}
  };
  const wrapper = shallow(<Day {...props}/>);
  return {props, wrapper};
}
describe('Day', () => {
  it('renders without crashing', () => {
    const {wrapper} = setup();
    expect(wrapper.find('DayDiv').exists()).toBe(true);
  });
  it('date is in MM/DD format and is the correct date', () => {
    const {wrapper} = setup();
    expect(wrapper.find('CalDate').childAt(0).text()).toMatch(/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/);
    expect(wrapper.find('CalDate').childAt(0).text()).toBe('07/31');
  });
  it('day of the week is abbreviated', () => {
    const {wrapper} = setup();
    expect(wrapper.find('DayOfWeek').childAt(0).text()).toBe('Tue');
  });
  it('renders the icon', () => {
    const {wrapper,props} = setup();
    expect(wrapper.find('img').prop('src')).toBe(`https://openweathermap.org/img/w/${props.weather[0].icon}.png`);
    expect(wrapper.find('img').prop('alt')).toBe(props.weather[0].main);
  });
  it('it converts the temp high to fahrenheit', () => {
    const {wrapper} = setup();
    expect(wrapper.find('High').childAt(0).text()).toBe('85°F');
  });
  it('it converts the temp low to celsius', () => {
    const {wrapper} = setup("2018-07-31 18:00:00", false);
    expect(wrapper.find('Low').childAt(0).text()).toBe('24°C');
  });
});