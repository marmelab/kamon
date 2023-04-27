FROM node:18-buster-slim as builder
COPY ./package.json /app/package.json
COPY ./.yarn /app/.yarn
COPY ./webapp /app/webapp
COPY ./core /app/core

WORKDIR /app
RUN yarn install
#RUN yarn workspaces focus @kamon/webapp
RUN yarn workspace @kamon/core build
RUN yarn workspace @kamon/webapp build

FROM node:18-buster-slim
COPY ./ /app
COPY ./package.json /app/package.json
COPY ./.yarn /app/.yarn
COPY ./webapp /app/webapp
COPY ./core /app/core
COPY --from=builder /app/core/dist /app/core/dist
COPY --from=builder /app/webapp/dist /app/webapp/dist
WORKDIR /app/webapp
ENV NODE_ENV=production
RUN yarn install && rm -rf ./.yarn/cache && rm -rf ./.yarn/install-state.gz

EXPOSE 3000

CMD yarn run start:prod

