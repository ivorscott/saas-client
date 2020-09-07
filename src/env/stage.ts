const environments = {
  backend: process.env.REACT_APP_STAGING_BACKEND,
  domain: process.env.REACT_APP_STAGING_AUTH_DOMAIN,
  audience: process.env.REACT_APP_STAGING_AUTH_AUDIENCE,
  clientId: process.env.REACT_APP_STAGING_AUTH_CLIENT,
};

export default environments;
