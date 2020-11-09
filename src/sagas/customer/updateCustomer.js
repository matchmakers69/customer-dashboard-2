import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { customerOperations, customerTypes } from '../../store/customer';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import { GET_CUSTOMER_SUCCESS } from '../../store/customer/types';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';
import { updateCustomer } from '../../api/customer';

const { UPDATE_CUSTOMER } = customerTypes;

export const performUpdateCustomer = function* performUpdateCustomer({
  payload,
}) {
  const { updateCustomerSuccess } = customerOperations;
  const { sendMessage } = messageOperations;
  try {
    const data = yield call(updateCustomer, payload.fields);
    const { errors } = data;
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      yield put(updateCustomerSuccess());
      yield take(GET_CUSTOMER_SUCCESS);
      yield put(goToRoute(payload.redirectPath));
      yield put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_CUSTOMER_SUCCESS,
        }),
      );
    }
  } catch (error) {
    // Handle errors with the request itself, produce default error.
    yield put(
      createError({
        code: DAS_UPDATE_CUSTOMER_FAILED,
      }),
    );
  }
};

export default takeLatest(UPDATE_CUSTOMER, performUpdateCustomer);
