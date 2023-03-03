## BUILDER IMAGE
FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci --no-audit --omit-dev

## PROD IMAGE
FROM node:lts-alpine as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/bin ./bin
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/app/app.ts ./app.ts

EXPOSE 8080

CMD ["npm", "start"]