
<img src="http://i.imgur.com/XZxefFm.jpg" width="380">

# Polymer 1.x Webpack Skeleton (ES6 Syntax)

[![Build Status](https://travis-ci.org/PolymerX/polymer-skeleton.svg?branch=master)](https://travis-ci.org/PolymerX/polymer-skeleton)

> Mininum boilerplate to deliver a Polymer 1.x in ES6 syntax with Webpack

🚧 WIP

Made for personal use, glad if someone can get a good starting point from here.

## Features

- [Webpack]() and [Babel]() as module loader with the ES2015 preset.
- webpack-dev-server with hot reloading active.
- PostCSS build.

## Usage

Clone this repository:

	$ git clone https://github.com/PolymerX/polymer-skeleton [your-app-name]

Remove the `.git` folder and change details within:

- `package.json`
- `src/manifest.json`

Then start building your application!

	$ yarn && bower install


### Build (Webpack) // TODO

CURRENTLY simply build the Webpack bundle (rework to Kubozer maybe)

	$ yarn build

### Developing

Start the `webpack-dev-server` on the port `3000` with hot reload and watch on `.postcss` files.

	$ yarn dev

### Developing JS

Start the `webpack-dev-server` on the port `3000` with hot reload.

	$ yarn dev:js

### Developing PostCSS

Watch on `.postcss` files within the `components` directory.

	$ yarn dev:postcss

### Test

CURRENTLY only XO for code style

	$ yarn test

## How Polymer is imported

It's a little trick to just show Polymer to Webpack and bundle with the other `js`.
Exporting the `window.Polymer` object and importing it where needed inside the `js` of the components.

## PostCSS build

During development the `.postcss` files will be watched and compiled to the `style-module.html` file within the component directory.

## Todo

- Setup unit (wct) and integration (Nightwatch) tests
- Add [PolymerRedux]()
- Add [unfetch]() polyfill
- Setup service-workers
- Add build process to `dist` directory
