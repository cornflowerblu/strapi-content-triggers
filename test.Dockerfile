FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci --no-audit

EXPOSE 8888

CMD [ "npm", "test" ]