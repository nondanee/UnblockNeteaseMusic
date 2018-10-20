FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production && mv node_modules ../
COPY . .

EXPOSE 8080

ENTRYPOINT ["node", "app.js"]

CMD ["node", "app.js"]