# Werewolf


This repo contains the front-end code for the Werewolf app, that helps you play games of Werewolf. The backend lambda can be found at https://github.com/nzchicken/Werewolf-lambda. If you want to get it running, you'll need to add the apiKey and rootUrl to the `app/util/data.js` file.

## Installation

```bash
$ npm install
```

This assumes you have node and bower installed.

## Static Analysis

Linting is performed before building, and as part of the watch task.

```bash
npm run build
```

or

```bash
npm run watch
```

## Build

Required to run unit tests and server.

```bash
$ npm run build
```

## Watch

Compiles CSS and Javascript code as you make changes.

```bash
npm run watch
```

## Unit Tests

```bash
$ npm t
```

## Running the App

```bash
npm start
```

Then go to `http://localhost:3002/`

## To Do

- [ ] Error handling
- [ ] Night actions need to be in order
- [ ] Change how night actions are listed against roles
- [ ] Style day review screen
- [ ] Refactor sagas to use selectors more
- [ ] Refactor actions to be more declarative
- [ ] Add tests
- [ ] Use environment variables
- [ ] Add validation of roles for role selection
- [ ] Add ability to load a previous game