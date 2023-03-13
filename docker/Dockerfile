FROM nginx:alpine as release
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

FROM node:16.14.2-buster as build
WORKDIR /app
COPY ./config-app ./
RUN npm install
RUN npm run build

FROM release as final
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]