
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';

import globalCss from './../../../postcss/global.postcss';
import css from './style.postcss';
import template from './template.html';

export default class SkApp extends PolymerElement {

  static get properties() {
    return {
      name: {
        type: String
      },
      someProp: {
        type: String,
        value: 'awesome prop',
        observer: '_obsPropChanged'
      },
      showChangedProp: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
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
    return `<style>${globalCss} ${css}</style> ${template}`;
  }

  constructor() {
    super();
  }
}

window.customElements.define('sk-app', SkApp);
