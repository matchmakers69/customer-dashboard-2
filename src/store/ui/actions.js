import { UPDATE_UI } from './types';

export const updateUI = obj => ({
  type: UPDATE_UI,
  payload: obj,
});
