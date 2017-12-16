import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppBar from 'material-ui/AppBar';
import NavBar from './NavBar';

configure({ adapter: new Adapter() });

function toggleMenu() {

}

describe('Navigation bar', () => {
  it('render dumb component', () => {
    // expect(shallow(<NavBar onMenuToggle={toggleMenu} />)).toHaveLength(1);
  });

  it('should render <AppBar />', () => {
    // expect(render(<NavBar onMenuToggle={toggleMenu} />).find(AppBar)).toHaveLength(1);
  });
});
