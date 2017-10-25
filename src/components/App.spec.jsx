import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

import NavBar from './NavBar/NavBar';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should test render', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should contain navbar', () => {
    expect(wrapper.containsMatchingElement(NavBar)).toEqual(1);
  });
});
