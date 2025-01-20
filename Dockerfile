FROM node:jod-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

ARG DATABASE_NAME
ARG DATABASE_HOST
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_PORT

ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_PORT=$DATABASE_PORT

RUN echo "Database Name: $DATABASE_NAME" > .env && \
    echo "Database Host: $DATABASE_HOST" > .env && \
    echo "Database User: $DATABASE_USER" > .env && \
    echo "Database Password: $DATABASE_PASSWORD" > .env && \
    echo "Database Port: $DATABASE_PORT" > .env

RUN npm i -g pnpm

RUN pnpm build

CMD ["node", "dist/main.js"]