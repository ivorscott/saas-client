const environments = {
  backend: process.env.REACT_APP_STAGING_BACKEND,
  domain: process.env.REACT_APP_STAGING_AUTH_DOMAIN,
  audience: process.env.REACT_APP_STAGING_AUTH_AUDIENCE,
  client_id: process.env.REACT_APP_STAGING_AUTH_CLIENT,
  redirect_uri: window.location.origin,
};

export default environments;
