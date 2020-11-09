import ContentHero from './ContentHero';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';
import state from './__fixtures__/state';

const setup = (storeOverride, propsOverride) => {
  const initialState = {
    ...state,
    ...storeOverride,
  };

  const props = {
    bookingReference: 'TF3180529',
    ...propsOverride,
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const wrapper = mountWithConfig(
    <Provider store={store}>
      <ContentHero {...props} />
    </Provider>,
  );

  return {
    wrapper,
    contentHeroDate: wrapper.find('.ContentHero__date'),
    wrapLoader: wrapper.find('WrapLoader'),
  };
};

describe('ContentHero', () => {
  it('should render WrapLoader if booking not loaded', () => {
    const { wrapLoader } = setup({
      booking: {},
    });
    expect(wrapLoader.exists()).toBe(true);
  });

  it('should successfully render the package date', () => {
    const { contentHeroDate } = setup();
    expect(contentHeroDate.text()).toBe('30th July - 2nd August 2020');
  });

  it('should render single date if departure and return date is the same', () => {
    const { contentHeroDate } = setup({
      booking: {
        TF3180529: {
          departure_date: {
            iso_value: '2020-07-30 00:00:00',
            isotz_value: '2020-07-30T00:00:00+01:00',
          },
          return_date: {
            iso_value: '',
            isotz_value: '',
          },
          package: {
            name: 'Truck Festival 2020',
          },
        },
      },
    });
    expect(contentHeroDate.text()).toBe('Thursday 30th July 2020');
  });
});
