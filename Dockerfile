FROM node:20-alpine AS dependencies

WORKDIR /cloudmart-app

COPY package*.json ./

RUN npm install --omit=dev


FROM node:20-alpine

WORKDIR /cloudmart-app

ENV NODE_ENV=production

RUN addgroup -S cloudmart && adduser -S cloudmart -G cloudmart

COPY --from=dependencies /cloudmart-app/node_modules ./node_modules

COPY package*.json ./
COPY server.js ./
COPY index.html ./

USER cloudmart

EXPOSE 3000

CMD ["node", "server.js"]