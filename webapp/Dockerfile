FROM node:18-buster-slim

ADD . /app

WORKDIR /app

RUN yarn install

ENV NODE_ENV=production
RUN yarn build 

EXPOSE 3000

CMD yarn run start:prod

