FROM node:lts-alpine as common

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

EXPOSE 3000

FROM common as development
CMD npm start

FROM common as ci
CMD CI=true npm test 