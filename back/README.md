# API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Type-graphql](https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=for-the-badge)
![Typeorm](https://img.shields.io/badge/Typeorm-black?style=for-the-badge)

## Getting starting

### Tools

Check that [`Nodejs`](https://nodejs.org/en/download/) is installed :

```sh
$ node -v
```

### Install all dependencies

Install all dependencies :

```sh
$ npm install
```

### Environment

Create .env file based on .env.example and modify variables if needed.

```sh
# Default settings
PORT=4000

# Database settings
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=your_db_host
TYPEORM_USERNAME=your_db_username
TYPEORM_PASSWORD=your_db_password
TYPEORM_DATABASE=your_db_name
TYPEORM_PORT=your_db_port
```

### Scripts

Compile the TypeScript files:

```sh
$ npm run build
$ npm run build:watch
```

Start development server :

```sh
$ npm run dev
```

Start production server :

```sh
$ npm start
```
