# DevPie Client

## Requirements

- AWS Account
- Auth0 Account
- Freshbooks Account
- [DevPie Client Core](https://github.com/devpies/devpie-client-core)

## Environment Variables

Create an `.env` file with the below content:
```
# .env.sample file

HTTPS=true
PORT=3000
REACT_APP__BACKEND=
REACT_APP__FRESHBOOKS_CLIENT_ID=
REACT_APP__FRESHBOOKS_CLIENT_SECRET=
REACT_APP__AWS_COGNITO_IDENTITY=
REACT_APP__AWS_REGION=
REACT_APP__AWS_S3_BUCKET=
REACT_APP__AUTH0_DOMAIN=
REACT_APP__AUTH0_AUDIENCE=
REACT_APP__AUTH0_CLIENT_ID=
```
## Usage

```
npm install
npm start
```