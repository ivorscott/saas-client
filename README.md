# SaaS-Client

Multi-tenant SaaS app built on AWS

![](docs/img/demo.png)

## Setup

1. Checkout `saas-infra` and deploy the `local` infrastructure.
2. You'll need the terraform output values to create the repository's `.env` file.
- Copy `.env.sample` in the project root and create your own.
```
# .env.sample

REACT_APP_USER_POOL_ID=[YOUR_SHARED_USER_POOL_ID_GOES_HERE]
REACT_APP_USER_POOL_CLIENT_ID=[YOUR_SHARED_USER_POOL_CLIENT_ID_GOES_HERE]
REACT_APP_BACKEND=https://api.devpie.local/api
```
3. Copy the self-signed certificates generated from the saas-infra instructions. Place them in the project root. They are used in the package.json file.
```
 "scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./devpie.local.pem SSL_KEY_FILE=./devpie.local-key.pem react-scripts start",
```
4. Run:
```
npm install
npm start
```
5. Then navigate to https://devpie.local:3000 
6. To login as a tenant, you must provision a tenant in the SaaS admin app. Use a real email. You will be sent a password.
    ![](docs/img/admin-webapp.png)

