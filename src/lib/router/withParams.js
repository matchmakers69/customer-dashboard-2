const withParams = (route, params = {}) => {
  let routeWithParams = route;
  Object.entries(params).map(
    ([param, value]) =>
      (routeWithParams = routeWithParams.replace(`:${param}`, value)),
  );
  return routeWithParams;
};

export default withParams;
