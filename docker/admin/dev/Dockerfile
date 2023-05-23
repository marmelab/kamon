FROM node:alpine
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 5173
CMD [ "yarn", "workspace", "@kamon/admin", "dev", "--port", "5173", "--host", "0.0.0.0" ]
