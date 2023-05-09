# Kamon

Kamon Game on CLI, web, mobile.

This project is a set of 4 packages :

- @kamon/core: the logic of the game
- @kamon/cli: the game playable in CLI
- @kamon/webapp: the game playable on a browser and the API
- @kamon/mobileapp: the game playable on mobile

All this package use a part of @kamon/core.

## Dependencies installation

All this packages use `yarn workspace`, so to install every dependencies:

```sh
cd kamon
make install
```

## @kamon/core

### Requirements

- Node.js ^18
- yarn

### Developing

```sh
## Re-run the script on change
yarn workspace @kamon/core watch
```

### Build

```sh
# build once
make build-core

# build watch, usefull to developp other apps
yarn workspace @kamon/core build -w
```

### Test

```sh
make test-core
```

## @kamon/cli

### Requirements

- Node.js ^18
- yarn

### Developing

```sh
## Re-run the script on change
yarn workspace @kamon/cli dev
```

### Build

```sh
# build once
make build-cli

# build watch
yarn workspace @kamon/cli build -w
```

### Play

```sh
## initialize a new game
make run-cli

## resume a game from a target save file
yarn start -f my_save_file.json
```

## @kamon/webapp

This package is build over NestJS, so all available command in NestJS are available here.

You need `docker compose` that will run a PostgresSql and the app.

### Install

Create a `.env` based on `.env.local` and configure it.

Next, run

```sh
docker compose build
docker compose up -d
```

#### Run the migrations

```sh
yarn @kamon/webapp db:migrate
```

### Running the app

```bash
# development
yarn @kamon/webapp run start
# or
make run-webapp

# watch mode
yarn @kamon/webapp run start:dev

# production mode
yarn @kamon/webapp run start:prod
```

### Test

```bash
# unit tests
yarn @kamon/webapp run test
# or
make unit-test-webapp

# e2e tests
yarn @kamon/webapp run test:e2e
# or
make e2e-test-webapp

# test coverage
yarn @kamon/webapp run test:cov
```

### Build

```sh
yarn workspace @kamon/webapp build
# or
make build-webapp
```

## @kamon/mobileapp

This package is build over React-Native and Expo.

Before you want to run the app, you need to run `@kamon/webapp` because it's the API of the game.

Create a `.env` based on `.env.local` and configure it. To use a local API (eg: localhost), use the same IP that Expo expose to you.  
Exemple: your Expo application run on `http://192.168.86.27:19000`, your API endpoint should look like `http://192.168.86.27:3000`. That's it.

### Developping

Install Expo Go on your phone and run

```sh
make run-mobileapp
```

### Build

First, you need an [Expo account](https://expo.dev/accounts/) to build on the Expo Cloud.

When you have an account, you have to run these commands as explain [here](https://docs.expo.dev/build/setup/)

```sh
npm install -g eas-cli
eas login
```

To build the application as an APK, run this

```sh
eas build --platform android --profile apk
```
