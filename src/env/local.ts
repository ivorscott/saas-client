const environment = {
  freshbooks_client_id: process.env.REACT_APP_DEV_FRESHBOOKS_CLIENT_ID,
  freshbooks_client_secret: process.env.REACT_APP_DEV_FRESHBOOKS_CLIENT_SECRET,
  identity_pool_id: process.env.REACT_APP_DEV_COGNITO_IDENTITY,
  cognito_region: process.env.REACT_APP_DEV_COGNITO_REGION,
  s3_bucket: process.env.REACT_APP_DEV_S3_BUCKET,
  s3_bucket_region: process.env.REACT_APP_DEV_S3_BUCKET_REGION,
  backend: process.env.REACT_APP_LOCAL_BACKEND,
  domain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  audience: process.env.REACT_APP_DEV_AUTH_AUDIENCE,
  client_id: process.env.REACT_APP_DEV_AUTH_CLIENT,
  redirect_uri: window.location.origin,
};

export default environment;
