FROM node:12.14.1-alpine as builder

WORKDIR /var/apps
COPY package*.json ./
RUN npm ci
COPY . .

ENV PORT 80

CMD [ "npm", "start" ]