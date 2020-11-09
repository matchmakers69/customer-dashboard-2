const mockStripe = () => {
  // These mocks were originally posted by user derrxb on GitHub
  // https://github.com/stripe/react-stripe-elements/issues/427#issuecomment-532643979

  const elementMock = {
    mount: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    update: jest.fn(),
  };

  const elementsMock = {
    create: jest.fn().mockReturnValue(elementMock),
  };

  const stripeMock = {
    elements: jest.fn().mockReturnValue(elementsMock),
    createToken: jest.fn(() => Promise.resolve()),
    createSource: jest.fn(() => Promise.resolve()),
  };

  // Set the global Stripe
  window.Stripe = jest.fn().mockReturnValue(stripeMock);

  // Ex. of a token successfully created mock
  stripeMock.createToken.mockResolvedValue({
    token: {
      id: 'test_id',
    },
  });

  // Ex. of a failure mock
  stripeMock.createToken.mockResolvedValue({
    error: {
      code: 'incomplete_number',
      message: 'Your card number is incomplete.',
      type: 'validation_error',
    },
  });
};

export default mockStripe;
