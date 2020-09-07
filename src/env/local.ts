const environments = {
  backend: process.env.REACT_APP_LOCAL_BACKEND,
  domain: process.env.REACT_APP_DEVELOPMENT_AUTH_DOMAIN,
  audience: process.env.REACT_APP_DEVELOPMENT_AUTH_AUDIENCE,
  clientId: process.env.REACT_APP_DEVELOPMENT_AUTH_CLIENT,
};

export default environments;
