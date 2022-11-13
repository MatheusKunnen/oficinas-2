const Env = require('./Env.js');

const defaultServerHost = Env.getDefaultServerHost() || 'http://localhost:5100';
const defaultAppBase = Env.getAppBase() || '';

// Back-end
const getLoginUrl = (host = defaultServerHost) => {
  return `${host}/user/login`;
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
};
