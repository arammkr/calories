# Calories API

> Calories API is service which provides REST api for calclulating daily calories 

#### calories-api Directory Layout

```
.
.
├── config
│   ├── config.json
│   ├── database.js
│   └── index.js
├── db
│   ├── data
│   ├── migrations
│   ├── models
│   ├── seeders
│   ├── clean.js
│   └── index.js
├── env
├── http
│   ├── controllers
│   │   └── NotFoundController
│   │       └── index.js
│   ├── exceptions
│   │   ├── InvalidParameterException.js
│   │   ├── NotFoundException.js
│   │   └── index.js
│   ├── middlewares
│   │   ├── cors.js
│   │   ├── cors.spec.js
│   │   ├── index.js
│   │   ├── internalServerError.js
│   │   └── validator.js
│   ├── routes
│   │   ├── health
│   │   │   └── index.js
│   │   ├── api.js
│   │   ├── index.js
│   │   └── index.spec.js
│   └── validators
├── services
├── utils
│   ├── express-logger.js
│   ├── index.js
│   └── logger.js
├── Dockerfile
├── README.md
├── app.js
├── docker-compose.yml
├── jest.config.js
├── package.json
├── result.txt
├── setup_and_run.sh
├── swagger.json
└── yarn.lock
```

#### NOTES

> Source code of micro-service route handlers should be located in `./routes/index.js`

> Adding of endpoint routes occurs in `./routes/**/*.js`

> Swagger specification of micro-service should be located in `./swagger.json`

## Single command execution

### For *development* enviroment
```./setup_and_run.sh [--withSeed]``` 

## Step by step manual execution

### Install application

1. Copy _.env_local_ to _.env_ and set/add values to variables

```
cp env/.env_<<desired environment>> .env
```

2. Install dependencies

```
yarn install
```

3. Run the application:

```
docker-compose up --build -d
```

4. Run migrations

```
docker-compose exec api yarn db:fresh
```

if you also need to have initial data for journeys run

```
docker-compose exec api yarn db:seed
```

Open in your browser:

- Api URI: http://localhost:9090/
- Swagger UI: http://localhost:3001/


### Run tests

```
yarn test
```
