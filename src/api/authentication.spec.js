import {
  attemptLogin,
  attemptLogout,
  changePassword,
  checkLogin,
  resetPassword,
} from './authentication';
import { get, post } from 'axios';

import { acceptStatuses } from '../lib/axios';

jest.mock('axios');
jest.mock('../lib/axios');

describe('attemptLogin', () => {
  it('should make a POST request to /api/customer/login with credentials', async () => {
    post.mockReturnValue(
      Promise.resolve({
        data: {
          customer: {
            id: 12345,
            authenticated: true,
          },
        },
      }),
    );

    await attemptLogin('test@kaboodle.co.uk', 'testing123');

    expect(post).toHaveBeenCalledWith('/api/customer/login', {
      email: 'test@kaboodle.co.uk',
      password: 'testing123',
    });
  });
});

describe('checkLogin', () => {
  it('should make a GET request to /api/customer/check', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          customer: {
            '@id': 12345,
            authenticated: true,
            reset_required: false,
          },
        },
      }),
    );

    await checkLogin();

    expect(get).toHaveBeenCalledWith('/api/customer/check');
  });
});

describe('attemptLogout', () => {
  it('should make a GET request to /api/customer/logout', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: { customer: { '@id': null, authenticated: false } },
      }),
    );

    await attemptLogout();

    expect(get).toHaveBeenCalledWith('/api/customer/logout');
  });
});

describe('changePassword', () => {
  it('should make a POST request to /api/customer/password/change with email and passwords', async () => {
    post.mockReturnValue(
      Promise.resolve({
        data: { success: true },
      }),
    );

    const payload = {
      email: 'test@kaboodle.co.uk',
      old_password: 'testing123',
      new_password: 'testing1234',
    };

    await changePassword(payload);

    expect(post).toHaveBeenCalledWith(
      '/api/customer/password/change',
      payload,
      {
        validateStatus: acceptStatuses(200, 403),
      },
    );
  });
});

describe('resetPassword', () => {
  it('should make a POST request to /api/customer/password/reset with email', async () => {
    post.mockReturnValue(
      Promise.resolve({
        data: { success: true },
      }),
    );

    const payload = {
      email: 'test@kaboodle.co.uk',
    };

    await resetPassword(payload);

    expect(post).toHaveBeenCalledWith('/api/customer/password/reset', payload, {
      validateStatus: acceptStatuses(200, 403),
    });
  });
});
