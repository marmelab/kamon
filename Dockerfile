FROM node:18-buster-slim as builder
COPY ./ /app
WORKDIR /app
RUN apt-get update && apt-get install make
RUN make install
RUN make build-cli
RUN make build-webapp

FROM node:18-buster-slim
COPY ./ /app
COPY --from=builder /app/webapp/dist /app/webapp/dist
WORKDIR /app/webapp
ENV NODE_ENV=production
RUN yarn install && rm -rf ./.yarn/cache && rm -rf ./.yarn/install-state.gz

EXPOSE 3000

CMD yarn db:migrate && yarn run start:prod

