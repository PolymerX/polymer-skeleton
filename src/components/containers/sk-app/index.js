
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';

import HueRotateCss from './../../../global_style/animations/hue-rotate.postcss';
import css from './style.postcss';
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
    return `<style>${HueRotateCss} ${css}</style> ${template}`;
  }
}

window.customElements.define('sk-app', SkApp);
