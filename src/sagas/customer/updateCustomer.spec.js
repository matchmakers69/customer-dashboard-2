import { createError, errorTypes } from '../../store/errors';
import { customerOperations, customerTypes } from '../../store/customer';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import { GET_CUSTOMER_SUCCESS } from '../../store/customer/types';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';
import { performUpdateCustomer } from './updateCustomer';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { updateCustomer } from '../../api/customer';

describe('updateCustomer', () => {
  const { updateCustomerSuccess } = customerOperations;
  const { UPDATE_CUSTOMER_SUCCESS } = customerTypes;
  const { ERROR_OCCURRED } = errorTypes;
  const { sendMessage } = messageOperations;

  it(`Yields ${UPDATE_CUSTOMER_SUCCESS} when API returns customer`, () => {
    const api = {
      updateCustomer: () => ({
        success: true,
      }),
    };

    testSaga(performUpdateCustomer, {
      payload: { fields: {}, redirectPath: '/' },
    })
      .next()
      .call(updateCustomer, {})
      .next(api.updateCustomer())
      .put(updateCustomerSuccess())
      .next()
      .take(GET_CUSTOMER_SUCCESS)
      .next()
      .put(goToRoute('/'))
      .next()
      .put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_CUSTOMER_SUCCESS,
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      updateCustomer: () => ({
        success: false,
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performUpdateCustomer, {
      payload: { fields: {}, redirectPath: '/' },
    })
      .next()
      .call(updateCustomer, {})
      .next(api.updateCustomer())
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

    testSaga(performUpdateCustomer, {
      payload: { fields: {}, redirectPath: '/' },
    })
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_UPDATE_CUSTOMER_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
