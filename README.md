# DevPie

SaaS app for independent software developers and their clients.

![frontend preview](docs/images/demo.png)

## Design

- [See Figma](https://www.figma.com/file/M0FVvRZWGUPWgJlby4UPjm/Devpie-Client?node-id=237%3A16)

## Requirements

- [Core](https://github.com/devpies/core)
- Environment Variables

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
