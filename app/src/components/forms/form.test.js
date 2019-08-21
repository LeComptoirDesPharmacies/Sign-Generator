import React from 'react';
import { shallow, mount } from 'enzyme';
import Form from '../forms/form';

describe('Form component', () => {
  test('renders', () => {
    const wrapper = shallow(<Form />);
    expect((wrapper).exists()).toBe(true);
  });
  test('render with input', () => {
      const wrapper = mount(<Form><div id="element"></div></Form>);
      expect(wrapper.find('#element').to.have.lengthOf(1));
  });
});