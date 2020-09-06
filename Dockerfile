FROM node:10.15.0-alpine as base
ENV NODE_ENV=production
WORKDIR /client
COPY package*.json ./
RUN npm i \ 
    && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
ENV PATH /client/node_modules/.bin:$PATH
EXPOSE 3000
RUN npm config list
WORKDIR /client/app
CMD ["npm", "run", "start"]

FROM dev as test
COPY . .
RUN npm audit

FROM test as build-stage

RUN npm run build

FROM nginx:1.15-alpine as prod
EXPOSE 80
COPY --from=build-stage /client/app/build /usr/share/nginx/html
COPY --from=build-stage /client/app/nginx.conf /etc/nginx/conf.d/default.conf



