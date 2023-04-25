FROM node:18-buster-slim

ADD . /app

WORKDIR /app

RUN yarn install

RUN yarn build 

EXPOSE 3000

CMD yarn run start:prod

