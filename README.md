# Order Service with Pharmacy Integration

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/tommyttf/3c376d8043ff9814b38b529acf221d40/raw/464ede5bada2c211eddd1997e090d36e8a2da2b1/pharmacy-order-server__heads_main.json)

Nestjs API server to create and retrieve orders from different pharmacy integrations

Whenever there is a new integration available from the mock API, just restart the server and `OrderService` will fetch the latest list from the mock API, or can set up a cron job to do it once per day

Assume there will be no same referId to be provided by different integrations

## Swagger UI
After start the server, can visit `http://localhost:3000/api` to try out the API server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
