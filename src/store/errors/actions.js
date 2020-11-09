import { ERROR_OCCURRED } from './types';

export const createError = (error = { code: 'default', message: '' }) => ({
  type: ERROR_OCCURRED,
  payload: {
    error: {
      code: error.code || error.error_code,
      message: error.message,
      timestamp: new Date(),
    },
  },
});
