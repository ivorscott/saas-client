const environments = {
  backend: process.env.REACT_APP_DEVELOPMENT_BACKEND,
  domain: process.env.REACT_APP_DEVELOPMENT_AUTH_DOMAIN,
  audience: process.env.REACT_APP_DEVELOPMENT_AUTH_AUDIENCE,
  client_id: process.env.REACT_APP_DEVELOPMENT_AUTH_CLIENT,
  redirect_uri: window.location.origin,
};

export default environments;
