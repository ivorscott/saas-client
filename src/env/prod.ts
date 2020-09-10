const environments = {
  backend: process.env.REACT_APP_PRODUCTION_BACKEND,
  domain: process.env.REACT_APP_AUTH_PRODUCTION_DOMAIN,
  audience: process.env.REACT_APP_AUTH_PRODUCTION_AUDIENCE,
  client_id: process.env.REACT_APP_AUTH_PRODUCTION_CLIENT,
  redirect_uri: window.location.origin,
};

export default environments;
