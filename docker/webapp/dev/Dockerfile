FROM node:alpine as builder
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "workspace", "@kamon/webapp", "start:dev" ]
