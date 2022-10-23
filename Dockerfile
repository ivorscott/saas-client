FROM node:14.18.2 as base

WORKDIR /client

COPY . ./

FROM base as dev

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]

FROM dev as build

RUN npm run build

FROM nginx:1.23-alpine
EXPOSE 80
COPY --from=build  /client/build /usr/share/nginx/html
COPY --from=build /client/nginx /etc/nginx
