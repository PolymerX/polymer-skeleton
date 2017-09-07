<img src="http://i.imgur.com/OqurdD1.jpg" width="530">

[![GitHub release](https://img.shields.io/github/release/PolymerX/polymer-skeleton.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton)
[![Build Status](https://travis-ci.org/PolymerX/polymer-skeleton.svg?style=flat-square&branch=master)](https://travis-ci.org/PolymerX/polymer-skeleton)
[![GitHub issues](https://img.shields.io/github/issues/PolymerX/polymer-skeleton.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton/issues)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)
[![Polymer Skeleton](https://img.shields.io/badge/polymerX-SKELETON-435877.svg?style=flat-square)](https://github.com/PolymerX/polymer-skeleton)


## Polymer Skeleton: **Polymer 3**
> A mininum boilerplate to deliver a Polymer 3.x with Webpack and PostCSS.
> Made for personal use, glad if someone can get a good starting point from here. **Bye bye Bower**.


## Features

- [Webpack](https://webpack.js.org/)
- webpack-dev-server with hot reloading active.
- [PostCSS](http://postcss.org/) with [cssnext](http://cssnext.io/) (include autoprefixer) plugin.

#### Loaders
- [text-loader](https://github.com/dfenstermaker/text-loader) - Load HTML templates as string.
- [postcss-html-loader](https://github.com/PolymerX/postcss-html-loader) - Load PostCSS into the `<style>` scoped tag of Polymer elements.

## Usage

Clone this repository:

	$ git clone https://github.com/PolymerX/polymer-skeleton [your-app-name]

Remove the `.git` folder and change details within:

- `package.json`
- `src/manifest.json`

Then start building your application!

	$ yarn

#### Developing

Start the `webpack-dev-server` on localhost `http://localhost:3000` with hot-reload and watch on `.postcss` files.

	$ yarn dev

#### Test

XO for code style and WCT for components tests.

	$ yarn test

#### Build (Webpack and copy statics) to `dist` folder

	$ yarn build

## Styling components with PostCSS and CSSNext

During development `.postcss` files will be watched, compiled and injected to the relative `style-module.html` file within the component directory. The CSS is scoped to the component so don't worry about CSS specificity, you can also use `:host`, `:host-context` and `:root` selectors. Read more about [styling web components](https://www.polymer-project.org/2.0/docs/devguide/style-shadow-dom) and [custom CSS properties](https://www.polymer-project.org/2.0/docs/devguide/custom-css-properties).

[Cssnext](http://cssnext.io/) also include Autoprefixer plugin, if you don't know how it work (...and you should), it allow you to write CSS without worry about vendor prefixes. Just write your css properties prefix-free and let autoprefixer do the work for you when compiling.

**How about commons styles?**
You can make a shared `style-module` and import it when you need commons styles inside your component. More info about this technique [here](https://www.polymer-project.org/1.0/docs/devguide/styling#style-modules)

## How Polymer 3 is imported

We are currently used a modified version of the `@polymer/polymer` official NPM version. The `flat` property within the `package.json` is causing some problem with the load dependency system of `webpack`.

## `@webcomponents/webcomponentsjs`

We are getting the `webpcomponents-loader.js` polyfill from GitHub using NPM/Yarn and copy it into a `vendor` folder with a `Node` script.
## Todo

- Setup unit (wct) and integration (Nightwatch/Testcafe/Puppeteer) tests
- Add [PolymerRedux]()
- Add fetch polyfill ?
- Setup service-workers
