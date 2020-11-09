import constants from '../../constants';

const getErrorMapping = code =>
  constants.errorMappings[code] || {
    message: "It looks like we're having a few problems with your request.",
    key: code,
    severity: constants.errorLogLevels.fatal,
    redirectPath: null,
  };

export default getErrorMapping;
