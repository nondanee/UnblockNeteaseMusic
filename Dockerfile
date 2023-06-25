FROM alpine
RUN apk add --update nodejs npm --repository=http://dl-cdn.alpinelinux.org/alpine/latest-stable/main/

ENV NODE_ENV production
ENV PORTS="80:443"
ENV CHINA_IP="103.126.92.133"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# EXPOSE 8080 8081
EXPOSE 80 443

ENTRYPOINT ["sh", "-c", "node app.js -p $PORTS -f $CHINA_IP"]
