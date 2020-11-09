import PieChart from './PieChart';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';
import payments from './__fixtures__/payments';

const setup = propsOverride => {
  const props = {
    data: payments,
    remainingBalance: 98.2,
    theme: {
      variables: {
        colors: {
          typeSuccess: 'green',
          typeDanger: 'blue',
          typeDefault: 'blue',
        },
      },
    },
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<PieChart {...props} />);

  return {
    wrapper,
    responsivePie: wrapper.find('ResponsivePie'),
  };
};

describe('PieChart', () => {
  it('should successfully render the pie-chart', () => {
    const { responsivePie } = setup();
    expect(responsivePie.exists()).toBe(true);
  });
});
