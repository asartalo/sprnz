# sprnz

[![CircleCI](https://circleci.com/gh/asartalo/sprnz.svg?style=svg)](https://circleci.com/gh/asartalo/sprnz) [![Maintainability](https://api.codeclimate.com/v1/badges/bb1ae28e4ed716473570/maintainability)](https://codeclimate.com/github/asartalo/sprnz/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/bb1ae28e4ed716473570/test_coverage)](https://codeclimate.com/github/asartalo/sprnz/test_coverage)

A collection of tools that use promises

The name is from “esperanza” which is a Spanish word for “hope”.

## Development

This project follows the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/).

### Run tests in watch mode:

```sh
npm run test-watch
```

### Run all tests:

```sh
npm run test
```

### Create a new package:

```sh
npm run create-package <library-name>
```

For example, running the following:

```sh
npm run create-package my-library
```

...will create the library named `@sprnz/my-library` library under `./packages`

## Publishing

```sh
npm run ls buildDist
lerna version --conventional-commits -m "chore(release): publish %s"
lerna publish
```

If the initial publish fails run:

```sh
lerna publish from-package
```
