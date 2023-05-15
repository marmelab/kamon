FROM node:18-buster-slim as builder
COPY ./admin ./app/admin
COPY ./docker/admin/nginx ./docker/admin/nginx
WORKDIR /app/admin
RUN yarn
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/admin/dist /usr/share/nginx/html
COPY --from=builder /docker/admin/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
