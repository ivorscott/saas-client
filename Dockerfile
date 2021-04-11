FROM node:10.15.0-alpine as build-stage

LABEL author="devpie"

EXPOSE 3000

WORKDIR /

COPY package*.json ./

ENV PATH /client/node_modules/.bin:$PATH
RUN npm install && npm cache clean --force
RUN npm config list

COPY . .

RUN npm audit
RUN npm run build

FROM nginx:1.15-alpine as prod
EXPOSE 80
COPY --from=build-stage /build /usr/share/nginx/html
COPY --from=build-stage /nginx /etc/nginx


