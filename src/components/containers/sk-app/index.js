
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import './../../dumbs/sk-menu';

import HueRotateCss from './../../../global-style/animations/hue-rotate.pcss';
import LinksCss from './../../../global-style/basics/links.pcss';
import TypographyCSS from './../../../global-style/basics/typography.pcss';
import css from './style.pcss';
import template from './template.html';

export default class SkApp extends PolymerElement {

  static get properties() {
    return {
      name: {
        type: String
      },
      appVersion: {
        type: String,
        value: process.env.appVersion
      },
      ENV: {
        type: String,
        value: process.env.NODE_ENV
      }
    };
  }

  static get template() {
    return `
      <style>
        ${TypographyCSS}
        ${LinksCss}
        ${HueRotateCss}
        ${css}
      </style>
      ${template}`;
  }
}

window.customElements.define('sk-app', SkApp);
