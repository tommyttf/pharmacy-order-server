# Order Service with Pharmacy Integration

To add another new pharmacy, one just need to follow the steps below just like the other 3:  
1. add the pharmacy name to `EPharmacyName` under `src/integration/enums/integration.enum.ts`
2. create its `OrderType` in `src/integration/interfaces/order.interface.ts`
3. create its `service` and `controller` under `src/integration/services` and `src/integration/controllers` respectively
4. add the `service` and `controller` in `src/integration/integration.module.ts`

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
