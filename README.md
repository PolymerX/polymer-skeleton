<img src="http://i.imgur.com/OqurdD1.jpg" width="530">

[![Build Status](https://travis-ci.org/PolymerX/polymer-skeleton.svg?style=flat-square&branch=master)](https://travis-ci.org/PolymerX/polymer-skeleton)
[![GitHub release](https://img.shields.io/github/release/PolymerX/polymer-skeleton.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton)
[![GitHub issues](https://img.shields.io/github/issues/PolymerX/polymer-skeleton.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton/issues)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
[![Polymer Skeleton](https://img.shields.io/badge/polymerX-SKELETON-435877.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton)


## Polymer Skeleton
> A mininum boilerplate to deliver a Polymer 1.x in ES6 syntax with Webpack and PostCSS.
> Made for personal use, glad if someone can get a good starting point from here.

## Features

- [Webpack](https://webpack.js.org/)
  - [Babel](https://babeljs.io/) as module loader with the ES2015 preset.
- webpack-dev-server with hot reloading active.
  - [BrowserSync](https://www.npmjs.com/package/browser-sync-webpack-plugin) plugin.
- [PostCSS](http://postcss.org/) with [cssnext](http://cssnext.io/) (include autoprefixer) plugin.

## Usage

Clone this repository:

	$ git clone https://github.com/PolymerX/polymer-skeleton [your-app-name]

Remove the `.git` folder and change details within:

- `package.json`
- `src/manifest.json`

Then start building your application!

	$ yarn && bower install

#### Developing

Start the `webpack-dev-server` & `browser-sync` on localhost `http://localhost:3000` with hot-reload and watch on `.postcss` files.

	$ yarn dev

#### Developing JS

Start the `webpack-dev-server` & `browser-sync` on localhost `http://localhost:3000` with hot-reload.

	$ yarn dev:js

#### Developing Style

Watch on `.postcss` files within the `components` directory.

	$ yarn dev:postcss

#### Test

CURRENTLY only XO for code style

	$ yarn test

#### Build (Webpack) // TODO

CURRENTLY simply build the Webpack bundle (rework to Kubozer maybe)

	$ yarn build

## Styling components with PostCSS and CSSNext

During development `.postcss` files will be watched, compiled and injected to the relative `style-module.html` file within the component directory. The CSS is scoped to the component so don't worry about CSS specificity, you can also use `:host`, `:host-context` and `:root` selectors. Read more about [styling web components](https://www.polymer-project.org/2.0/docs/devguide/style-shadow-dom) and [custom CSS properties](https://www.polymer-project.org/2.0/docs/devguide/custom-css-properties).

[Cssnext](http://cssnext.io/) also include Autoprefixer plugin, if you don't know how it work (...and you should), it allow you to write CSS without worry about vendor prefixes. Just write your css properties prefix-free and let autoprefixer do the work for you when compiling.


## How Polymer is imported

It's a little trick to just show Polymer to Webpack and bundle with the other `js`.
Exporting the `window.Polymer` object and importing it where needed inside the `js` of the components.

**How about commons styles?**
You can make a shared `style-module` and import it when you need commons styles inside your component. More info about this technique [here](https://www.polymer-project.org/1.0/docs/devguide/styling#style-modules)

## Todo

- Setup unit (wct) and integration (Nightwatch) tests
- Add [PolymerRedux]()
- Add [unfetch]() polyfill
- Setup service-workers
- Add build process to `dist` directory
