import { ErrorPage } from './ErrorPage';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ErrorPage', () => {
  it('should render the go back button when there is sufficent history', () => {
    const history = {
      length: 3,
    };

    const wrapper = mountWithConfig(
      <MemoryRouter initialEntries={['/']}>
        <ErrorPage history={history} />
      </MemoryRouter>,
    );
    expect(wrapper.find('.Button').text()).toEqual('Go back to previous page');
  });

  it('should render the go back to dashboard when there is insufficent history', () => {
    const history = {
      length: 2,
    };

    const wrapper = mountWithConfig(
      <MemoryRouter initialEntries={['/']}>
        <ErrorPage history={history} />
      </MemoryRouter>,
    );
    expect(wrapper.find('.Button').text()).toEqual('Go to dashboard');
  });
});
