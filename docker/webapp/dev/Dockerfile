FROM node:18-buster-slim
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 3000
WORKDIR /app/webapp
CMD yarn db:migrate && yarn start:debug
