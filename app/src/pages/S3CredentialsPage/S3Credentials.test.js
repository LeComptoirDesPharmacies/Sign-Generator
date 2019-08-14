import React from 'react';
import { shallow } from 'enzyme';
import S3Credentials from './S3Credentials';

describe('S3Credentials component', () => {
  test('renders', () => {
    const wrapper = shallow(<S3Credentials />);
    expect((wrapper).exists()).toBe(true);
  });
});