FROM alpine
RUN apk add --update nodejs npm --repository=http://dl-cdn.alpinelinux.org/alpine/latest-stable/main/

ENV NODE_ENV production
ENV SOURCE bilibili kugou kuwo

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 8080 8081

ENTRYPOINT ["sh", "-c", "node app.js -o ${SOURCE}"]
