import { createError, errorTypes } from '../../store/errors';
import { customerOperations, customerTypes } from '../../store/customer';

import { DAS_GET_CUSTOMER_FAILED } from '../../constants/errors';
import { getCustomer } from '../../api/customer';
import { performGetCustomer } from './getCustomer';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('getCustomer', () => {
  const { getCustomerSuccess, getCustomerFailed } = customerOperations;
  const { GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAILED } = customerTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${GET_CUSTOMER_SUCCESS} when API returns customer`, () => {
    const api = {
      getCustomer: () => ({
        customer: {
          id: 123456,
          email_verification_required: false,
          personal_details: {
            title: 'Mr',
            first_name: 'John',
            last_name: 'Smith',
            email: 'test@kaboodle.co.uk',
          },
        },
      }),
    };

    testSaga(performGetCustomer)
      .next()
      .call(getCustomer)
      .next(api.getCustomer())
      .put(
        getCustomerSuccess({
          id: 123456,
          email_verification_required: false,
          personal_details: {
            title: 'Mr',
            first_name: 'John',
            last_name: 'Smith',
            email: 'test@kaboodle.co.uk',
          },
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${GET_CUSTOMER_FAILED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      getCustomer: () => ({
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performGetCustomer)
      .next()
      .call(getCustomer)
      .next(api.getCustomer())
      .put(getCustomerFailed())
      .next()
      .all([
        put(
          createError({
            error_code: 1234567,
            error_message: 'This is an error.',
          }),
        ),
      ])
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performGetCustomer)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_GET_CUSTOMER_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
