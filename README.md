# Polymer 1.x Webpack Skeleton (ES6 Syntax)

[![Build Status](https://travis-ci.org/PolymerX/polymer-webpack-skeleton.svg?branch=master)](https://travis-ci.org/PolymerX/polymer-webpack-skeleton)

> Mininum boilerplate to deliver a Polymer 1.x in ES6 syntaxt with Webpack

:construction: WIP

Made for personal use, glad if someone can get a good starting point from here.

## Features

- [Webpack]() and [Babel]() as module loader with the ES2015 preset
- webpack-dev-server with hot reloading active
- SASS build using [node-sass]()

## Usage

Clone this repository:

	$ git clone https://github.com/PolymerX/polymer-webpack-skeleton [your-app-name]

Remove the `.git` folder and change details within:

- `package.json`
- `src/manifest.json`

Then start building your application!

	$ yarn && bower install

### Developing

Start the `webpack-dev-server` on the port `3000` with hot reload

	$ yarn dev

### Build (Webpack)

CURRENTLY simply build the Webpack bundle (rework to Kubozer maybe)

	$ yarn build

### Build SASS

Configuration within the `SASS` namespace of the `package.json`

	$ yarn sass

### Test

CURRENTLY only XO for code style

	$ yarn test

## How Polymer is imported

It's a little trick to just show Polymer to Webpack and bundle with the other `js`.
Exporting the `window.Polymer` object and importing it where needed inside the `js` of the components.

## SASS build

Configurations are located within the `package.json` at the `sass` namespace. Currently only `files` is supported.
The build will take care of creating a new folder (`css`), compress and rename your file to `.css`.

## Todo

- Setup unit (wct) and integration (Nightwatch) tests
- Hot reloading also on SASS changes
- Add [PolymerRedux]()
- Add [unfetch]() polyfill
- Setup service-workers
- Add build process to `dist` directory
