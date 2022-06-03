FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

COPY . .

RUN npm run init
RUN npm run build

EXPOSE 7001

CMD npm start