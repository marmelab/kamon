FROM node:18-buster-slim as builder
COPY ./ /app
WORKDIR /app
RUN yarn install
RUN yarn build 

FROM node:18-buster-slim
COPY ./ /app
COPY --from=builder /app/dist /app/dist
WORKDIR /app
ENV NODE_ENV=production
RUN yarn install && rm -rf ./.yarn/cache && rm -rf ./.yarn/install-state.gz

EXPOSE 3000

CMD yarn run start:prod

