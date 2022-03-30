# My Custom Giphy Application

## 📺 Demo

You can test the application [here](https://google.fr)

## 🚀 Purpose of the Project

This Project is an exercice for the Wild Code School

## ⚒ What the Application can do :

- It's a trello clone
- TODO....

## 🦾 Technical Stack

- [Create React App](https://github.com/facebook/create-react-app)
- [NodeJS](https://nodejs.org/en/)
- [GraphQL](https://graphql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [TailwindCSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)

## ❓ How to start the Project

### ⚙️ Install

1. First of all you need to clone the repostory into a local folder

2. Then you have to install the docker images by typing in your terminal :

```
docker-compose -f docker-compose.yml up --build
```

It will launch 4 containers :
mysql,
mysql_test,
api (back-end),
web (front-end)

### 🦸‍♂️ Run

Everything is good now you can yo to

```sh
http://localhost:3000/
```

### 🐻 How to run test from root

```
docker-compose exec api npm run test:watch
```
