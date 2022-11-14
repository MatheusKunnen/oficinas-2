const Env = require('./Env.js');

const defaultServerHost = Env.getDefaultServerHost() || 'http://localhost:5100';
const defaultAppBase = Env.getAppBase() || '';

// Back-end
const getLoginUrl = (host = defaultServerHost) => {
  return `${host}/user/login`;
};

const getParametersUrl = (host = defaultServerHost) => {
  return `${host}/parameter`;
};

const getParameterUpdateUrl = (key, host = defaultServerHost) => {
  return `${host}/parameter/${key}`;
};

const getOcupationsInUseUrl = (host = defaultServerHost) => {
  return `${host}/locker_ocupation/in_use`;
};

const getOcupationsUrl = (host = defaultServerHost) => {
  return `${host}/locker_ocupation`;
};

const getOcupationsStatisticsUrl = (host = defaultServerHost) => {
  return `${host}/locker_ocupation/statistics`;
};

const getDescriptorImageUrl = (id, host = defaultServerHost) => {
  return `${host}/client_descriptor/${id}/image`;
};
// Front-end
const getLoginPageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/login`;
};

const getHomePageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/home`;
};

module.exports = {
  getLoginUrl,
  getLoginPageUrl,
  getHomePageUrl,
  getParametersUrl,
  getOcupationsInUseUrl,
  getDescriptorImageUrl,
  getOcupationsUrl,
  getParameterUpdateUrl,
  getOcupationsStatisticsUrl,
};
