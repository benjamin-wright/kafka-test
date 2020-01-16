FROM node:12.14.1-alpine

WORKDIR /var/app

COPY package*.json ./

RUN npm ci

COPY ./src ./src

CMD [ "npm", "start" ]