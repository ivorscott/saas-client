# SaaS-Client

This project is a part of "AWS SaaS app in 30 days" - _Proof of Concept_

![](docs/img/demo.png)

## Setup

1. Checkout `saas-infra` and deploy the `local` infrastructure.
2. Use the terraform output values for this repository's `.env` file.
Copy `.env.sample` in the project root and create your own `.env` file.
3. Copy the self-signed certificates generated from the saas-infra instructions
and place them in the project root. This will be used in the package.json file.
```
 "scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./devpie.local.pem SSL_KEY_FILE=./devpie.local-key.pem react-scripts start",
```
4. Run the following:
```
npm install
npm start
```
5. Then navigate to https://devpie.local:3000 
6. To login as a tenant, you must provision a tenant in the SaaS admin app.
    ![](docs/img/admin-webapp.png)
   - __Use a real email__. You will be sent a password.
