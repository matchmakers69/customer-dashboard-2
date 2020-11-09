import acceptStatuses from './acceptStatuses';

describe('acceptStatuses', () => {
  it('Should return function that validates statuses passed to it', () => {
    const validateStatus = acceptStatuses(500, 403);
    expect(validateStatus(403)).toEqual(true);
  });

  it('Should return function that does not validate statuses NOT passed to it', () => {
    const validateStatus = acceptStatuses(500, 403);
    expect(validateStatus(400)).toEqual(false);
  });
});
