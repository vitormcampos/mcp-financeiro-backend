FROM node:lts-alpine AS build

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable-alpine-slim AS ngi

COPY --from=build /app/dist/web-client/browser/ /usr/share/nginx/html
COPY /nginx/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
