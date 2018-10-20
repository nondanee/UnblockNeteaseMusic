FROM node:8-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production && mv node_modules ../
COPY . .

EXPOSE 8080

ENTRYPOINT ["node", "app.js"]