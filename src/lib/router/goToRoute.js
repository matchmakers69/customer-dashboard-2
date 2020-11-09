import { push } from 'connected-react-router';
import withOptions from './withOptions';
import withParams from './withParams';

const goTo = (route, params, options) => {
  withOptions(options);
  return push(withParams(route, params));
};

export default goTo;
