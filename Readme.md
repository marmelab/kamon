# Kamon Console

Play the game of Kamon on the console

## Requirements

- Node.js
- yarn

## Installation

```sh
make install
```

### Playing

```sh
## make a game from save.json
make run

## make a game from a target save file
yarn start -f my_save_file.json
```

### Developing

```sh
## Re-run the script on change
yarn dev

## typecheck && compile
yarn build

## format
yarn prettier --write .

## test
yarn test
```
