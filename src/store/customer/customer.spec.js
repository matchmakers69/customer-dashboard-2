import {
  GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
} from './types';
import {
  getCustomer,
  getCustomerSuccess,
  updateCustomer,
  updateCustomerSuccess,
} from './actions';

import reducer from './reducers';

describe('customer', () => {
  it("Returns initial state when a matching actions isn't passed through", () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      loaded: false,
    });
  });

  it(`Sets loaded state to TRUE when ${GET_CUSTOMER_SUCCESS} is dispatched`, () => {
    expect(reducer({ loaded: false }, getCustomerSuccess())).toEqual({
      loaded: true,
    });
  });

  it(`Passes the information to the saga to update when ${UPDATE_CUSTOMER} is dispatched`, () => {
    const payload = {
      personal_details: {
        sex: '',
        gender: '',
        date_of_birth: '',
        title: '',
        first_name: 'Mark',
        last_name: 'Muldoon',
        email: 'muldoony@gmail.com',
        phone: '48464568465',
        emergency_contact: {
          full_name: 'This is a name',
          telephone: '0790099887',
        },
        club_membership_number: '',
      },
    };

    expect(reducer({ customer: null }, updateCustomer(payload))).toEqual({
      customer: null,
    });
  });
  it(`passes the state when ${UPDATE_CUSTOMER_SUCCESS} is dispatched`, () => {
    expect(reducer({ loaded: false }, updateCustomerSuccess())).toMatchObject({
      loaded: false,
    });
  });

  it(`passes the state when ${GET_CUSTOMER} is dispatched`, () => {
    expect(reducer({ loaded: false }, getCustomer)).toMatchObject({
      loaded: false,
    });
  });
});
