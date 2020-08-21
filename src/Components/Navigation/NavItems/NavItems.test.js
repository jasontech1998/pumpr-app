import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavItems} from './NavItems';
import NavItem from '../NavItem/NavItem';

configure({adapter: new Adapter()});

describe('<NavItems />' , () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  })

  it('should render 2 NavItem component' , () => {
    wrapper.setProps({token: false});
    expect(wrapper.find(NavItem)).toHaveLength(2);
  })
});