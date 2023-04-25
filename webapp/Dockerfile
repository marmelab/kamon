FROM node:18-buster-slim as builder
COPY ./ /app
WORKDIR /app
RUN yarn install
RUN yarn build 

FROM node:18-buster-slim
COPY --from=builder /app /app
WORKDIR /app
ENV NODE_ENV=production

EXPOSE 3000

CMD yarn run start:prod

