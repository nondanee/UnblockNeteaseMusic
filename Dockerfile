ARG ARCH="amd64"
FROM multiarch/alpine:$ARCH-latest-stable
RUN apk add --update nodejs npm

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 8080 8081

ENTRYPOINT ["node", "app.js"]