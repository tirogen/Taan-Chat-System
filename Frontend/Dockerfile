FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production; \
    npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build"]