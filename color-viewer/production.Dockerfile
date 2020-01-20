FROM node:12.14.1-alpine as builder

WORKDIR /var/apps
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /var/apps/build /usr/share/nginx/html
