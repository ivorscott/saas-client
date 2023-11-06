# SaaS-Client

This project has 3 repositories:

- [saas-core](https://github.com/devpies/saas-core)
- [saas-client](https://github.com/devpies/saas-client) (this repo)
- [saas-infra](https://github.com/devpies/saas-infra)

## Overview

SaaS-Client is a multi-tenant SaaS frontend built in React and Typescript.
It's a simple project management tool like Jira or Trello and communicates 
with the SaaS-Core backend: a collection of Go services.

![](docs/img/demo.png)

## Setup

1. Checkout `saas-infra` and deploy the `local` infrastructure.
2. Create your own `.env` file from the `.env.sample`file.
You'll need the `shared_user_pool_id` and `shared_user_pool_client_id` from terraform's output values.

    ```
    REACT_APP_USER_POOL_ID=[YOUR_SHARED_USER_POOL_ID_GOES_HERE]
    REACT_APP_USER_POOL_CLIENT_ID=[YOUR_SHARED_USER_POOL_CLIENT_ID_GOES_HERE]
    REACT_APP_STRIPE_KEY=[YOUR_STRIPE_KEY_GOES_HERE]
    REACT_APP_BACKEND=https://api.devpie.local/api
    ```
3. Fetch the self-signed certificates generated from step 6 in the [saas-core instructions](https://github.com/devpies/saas-core/blob/main/docs/SETUP.md). Copy them into the root of this project. They are used in the start command of the
`package.json` file:
    ```
     "scripts": {
        "start": "HTTPS=true SSL_CRT_FILE=./devpie.local.pem SSL_KEY_FILE=./devpie.local-key.pem react-scripts start",
    ```

4. Finally run:
    ```bash
    npm install
    npm start
    ```
5. Navigate to https://devpie.local:3000


__NOTE:__ Requests using localhost:3000 will be blocked by CORS!

