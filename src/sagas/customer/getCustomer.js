import { all, call, put, takeLatest } from 'redux-saga/effects';
import { customerOperations, customerTypes } from '../../store/customer';

import { DAS_GET_CUSTOMER_FAILED } from '../../constants/errors';
import { authTypes } from '../../store/auth';
import { createError } from '../../store/errors';
import { getCustomer } from '../../api/customer';

const { LOGIN_SUCCESS } = authTypes;
const { GET_CUSTOMER, UPDATE_CUSTOMER_SUCCESS } = customerTypes;
const { getCustomerSuccess, getCustomerFailed } = customerOperations;

export const performGetCustomer = function* performGetCustomer() {
  try {
    const { customer, errors } = yield call(getCustomer);

    if (customer) {
      yield put(getCustomerSuccess(customer));
    } else {
      yield put(getCustomerFailed());
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    }
  } catch (error) {
    // Handle errors with the request itself
    yield put(
      createError({
        code: DAS_GET_CUSTOMER_FAILED,
      }),
    );
  }
};

export default takeLatest(
  [LOGIN_SUCCESS, GET_CUSTOMER, UPDATE_CUSTOMER_SUCCESS],
  performGetCustomer,
);
