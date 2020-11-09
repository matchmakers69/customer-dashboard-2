import {
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  GET_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
} from './types';

export const getCustomer = {
  type: GET_CUSTOMER,
};

export const getCustomerSuccess = customer => ({
  type: GET_CUSTOMER_SUCCESS,
  payload: { customer },
});

export const getCustomerFailed = error => ({
  type: GET_CUSTOMER_FAILED,
  payload: { error },
});

export const updateCustomer = (fields, redirectPath) => ({
  type: UPDATE_CUSTOMER,
  payload: { fields, redirectPath },
});

export const updateCustomerSuccess = () => ({
  type: UPDATE_CUSTOMER_SUCCESS,
});
