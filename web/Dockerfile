FROM node:16 as common

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

EXPOSE 3000

FROM common as development
CMD npm start