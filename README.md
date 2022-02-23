# How to launch the project

```
docker-compose -f docker-compose.yml up --build
```

It will launch 3 containers :
mysql,
mysql test,
api (back-end),
web (front-end)

## How to run test from root

```
docker-compose exec api npm run test:watch
```

## Continuous integration (CI)

Run CI checks:

```
./ci-web-client.sh
./ci-api.sh
```
