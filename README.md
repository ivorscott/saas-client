# DevPie Client Frontend

![frontend preview](docs/images/demo.png)

## Goal

This is an experimental project for learning.

Devpie Client is a business management tool for performing software development with clients. Features will include
kanaban or agile style board management and auxiliary services like cost estimation, payments and more.

- [See Figma design](https://www.figma.com/file/M0FVvRZWGUPWgJlby4UPjm/Devpie-Client?node-id=237%3A16)
- [See Frontend repository](https://github.com/devpies/devpie-client-app)
- [See Events repository](https://github.com/devpies/devpie-client-events)
- [See Infrastructure repository](https://github.com/devpies/devpie-client-infra)

## Requirements

- AWS Account
- Auth0 Account
- Freshbooks Account
- [DevPie Client Core](https://github.com/devpies/devpie-client-core)

## Environment Variables

Create an `.env` file with the below content:
```
# .env file

VITE__BACKEND=http://localhost/api/v1
VITE__AUTH0_DOMAIN=
VITE__AUTH0_AUDIENCE=
VITE__AUTH0_CLIENT_ID=
```
## Usage

```
npm install
npm run dev
```
