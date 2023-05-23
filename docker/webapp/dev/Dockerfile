FROM node:18-buster-slim as builder
COPY ./ /app
WORKDIR /app
RUN apt-get update && apt-get install make
RUN make install
RUN make build-core
RUN make build-webapp

FROM node:18-buster-slim
COPY --from=builder /app /app
WORKDIR /app
RUN yarn install && rm -rf ./.yarn/cache && rm -rf ./.yarn/install-state.gz

EXPOSE 3000

CMD sh ./docker/webapp/dev/entrypoint.sh