const environments = {
  backend: process.env.REACT_APP_PRODUCTION_BACKEND,
  domain: process.env.REACT_APP_AUTH_PRODUCTION_DOMAIN,
  audience: process.env.REACT_APP_AUTH_PRODUCTION_AUDIENCE,
  clientId: process.env.REACT_APP_AUTH_PRODUCTION_CLIENT,
};

export default environments;
