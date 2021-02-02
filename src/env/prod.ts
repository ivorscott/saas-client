const environment = {
  freshbooks_client_id: process.env.REACT_APP_PROD_FRESHBOOKS_CLIENT_ID,
  freshbooks_client_secret: process.env.REACT_APP_PROD_FRESHBOOKS_CLIENT_SECRET,
  freshbooks_authorization_url: process.env.REACT_APP_PROD_FRESHBOOKS_AUTHORIZATION_URL,
  freshbooks_token_url: process.env.REACT_APP_PROD_FRESHBOOKS_TOKEN_URL,
  freshbooks_api_url: process.env.REACT_APP_PROD_FRESHBOOKS_API_URL,
  identity_pool_id: process.env.REACT_APP_PROD_COGNITO_IDENTITY,
  cognito_region: process.env.REACT_APP_PROD_COGNITO_REGION,
  s3_bucket: process.env.REACT_APP_PROD_S3_BUCKET,
  s3_bucket_region: process.env.REACT_APP_DEV_S3_BUCKET_REGION,
  backend: process.env.REACT_APP_PROD_BACKEND,
  domain: process.env.REACT_APP_AUTH_PROD_DOMAIN,
  audience: process.env.REACT_APP_AUTH_PROD_AUDIENCE,
  client_id: process.env.REACT_APP_AUTH_PROD_CLIENT,
  redirect_uri: window.location.origin,
};

export default environment;
