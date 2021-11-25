# Api Graphql Apollo Sqlite

Create a basic API with graphQl

## Features

- ![NodeJS](https://img.shields.io/badge/NODE.JS-black?style=plastic&logo=node.js)
- ![GraphQL](https://img.shields.io/badge/GraphQL-black?style=plastic&logo=graphql)
- ![Apollo-GraphQL](https://img.shields.io/badge/ApolloGraphQL-black?style=plastic&logo=apollo-graphql)
- ![SQLite](https://img.shields.io/badge/sqlite-black?style=plastic&logo=sqlite)
- ![MySQL](https://img.shields.io/badge/mysql-black?style=plastic&logo=mysql)
- ![EsLint](https://img.shields.io/badge/ESLint-black?style=plastic&logo=eslint)
- ![TypeScript](https://img.shields.io/badge/typescript-black?style=plastic&logo=typescript)
- ![Type-graphql](https://img.shields.io/badge/TypeGraphQL-black?style=plastic)
- ![Typeorm](https://img.shields.io/badge/Typeorm-black?style=plastic)

## Getting starting

### Tools

Check that [`Nodejs`](https://nodejs.org/en/download/) is installed :

```sh
$ node -v
```

### Install all dependencies

Install all dependencies :

```sh
$ yarn
$ npm install
```

### Environment

Create .env file based on .env.example and modify variables if needed.

```sh
# Default settings
PORT=4000
```

If you choose database mysql, add :

```sh
yarn add mysql2
```

```sh
# Database settings
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=your_db_host
TYPEORM_USERNAME=your_db_username
TYPEORM_PASSWORD=your_db_password
TYPEORM_DATABASE=your_db_name
TYPEORM_PORT=your_db_port
```

If you choose database sqlite, add :

```sh
yarn add sqlite3
```

```sh
# Database settings
TYPEORM_CONNECTION="sqlite"
TYPEORM_DATABASE="./src/database/db-sqlite.db"
TYPEORM_PORT=your_db_port
```

### Scripts

Execute eslint :

```sh
$ yarn lint
```

Compile the TypeScript files:

```sh
$ yarn build
$ yarn build:watch
```

Start development server :

```sh
$ yarn dev
```

Start production server :

```sh
$ yarn start
```

### Queries

Get all movies

```javascript
query {
  Movies {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

Get first movie

```javascript
query {
  FirstMovie {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

Get last movie

```javascript
query {
  LastMovie {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

Get last movie

```javascript
query($title: String!) {
  MovieByTitle(title: $title) {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

Post new movie

```javascript
mutation($title: String!, $director: String!, $year: Int!, $rating: Int!, $duration: Int!, $type: String!) {
  addMovie(title: $title, director: $director, year: $year, rating: $rating, duration: $duration, type: $type) {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

```javascript
{
  "title": "Jurassic Park",
  "director": "Steven Spielberg",
  "year": 1993,
  "rating": 8.1,
  "duration": 127,
  "type": "Adventure"
}
```

Update movie

```javascript
mutation($id: Int!, $title: String, $director: String, $year: Int, $rating: Int, $duration: Int, $type: String) {
  updateMovie(id: $id, title: $title, director: $director, director: $director, year: $year, rating: $rating, duration: $duration, type: $type) {
    id
    title
    director
    year
    rating
    duration
    type
  }
}
```

```javascript
{
  "id": 2,
  "rating": 10,
  "type": "Action"
}
```

Delete movie

```javascript
mutation($title: Int!) {
  deleteMovie(title: $title) {
    title
    director
    year
    rating
    duration
    type
  }
}
```

```javascript
{
  "id": 2
}
```
