import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './NavBar';

configure({ adapter: new Adapter() });

function toggleMenu(){

}

describe('Navigation bar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar onMenuToggle={toggleMenu} />);
  });

  it('render dumb component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
