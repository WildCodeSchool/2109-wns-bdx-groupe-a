FROM node:lts-alpine as common

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM common as development
CMD npm start

FROM common as ci
CMD npm test