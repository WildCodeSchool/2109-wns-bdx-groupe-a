# How to launch the project

```
docker-compose -f docker-compose.yml up --build
```

It will launch 3 containers :
mysql
api (back-end)
web (front-end)

## How to run test from root

```
docker-compose exec api npm run test:watch
```
