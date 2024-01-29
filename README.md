# Order Service with Pharmacy Integration

[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/tommyttf/3c376d8043ff9814b38b529acf221d40/raw/png-to-jpeg-using-worker-threads__heads_main.json)]

Nestjs API server to create and retrieve orders from different pharmacy integrations

Whenever there is a new integration available from the mock API, just restart the server and `OrderService` will fetch the latest list from the mock API, or can set up a cron job to do it once per day

Assume there will be no same referId to be provided by different integrations

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
