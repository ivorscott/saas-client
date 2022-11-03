ARG backend
ARG user_pool_id
ARG user_pool_client_id

FROM node:14.18.2 as base

WORKDIR /client

COPY . ./

FROM base as dev

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]

FROM dev as build

ARG backend
ARG user_pool_id
ARG user_pool_client_id

RUN echo "REACT_APP_USER_POOL_ID=$user_pool_id" >> .env && \
    echo "REACT_APP_USER_POOL_CLIENT_ID=$user_pool_client_id" >> .env && \
    echo "REACT_APP_BACKEND=$backend" >> .env

RUN npm run build

FROM nginx:1.23-alpine as prod
EXPOSE 80
COPY --from=build  /client/build /usr/share/nginx/html
COPY --from=build /client/nginx /etc/nginx
CMD ["nginx", "-g", "daemon off;"]