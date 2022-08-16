FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ARG env
RUN if [ "$env" == "dev"  ]; then yarn run ng build -- --configuration=development; elif [ "$env" == "stag" ]; then yarn run ng build -- --configuration=staging; else yarn run ng build -- --prod; fi

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
RUN apk add nano
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]