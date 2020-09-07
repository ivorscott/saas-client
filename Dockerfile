FROM node:10.15.0-alpine as dev
EXPOSE 3000
WORKDIR /client
COPY package*.json ./
ENV PATH /client/node_modules/.bin:$PATH
RUN npm i && npm cache clean --force
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



