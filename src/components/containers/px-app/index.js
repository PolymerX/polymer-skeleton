
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';

import globalCss from './../../../postcss/global.postcss';
import css from './style.postcss';
import template from './template.html';

export default class PxApp extends PolymerElement {

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
    console.log('Old ready() callback');

    // For testing the observer, remove me.
    setTimeout(() => {
      this.someProp = 'chaaaaaaange';
      // Tested with WCT
      this.dispatchEvent(new CustomEvent('prop-changed'));
    }, 2000);
  }

  _obsPropChanged(value, oldValue) {
    if (oldValue === undefined) {
      return false;
    }

    console.log('Prop changed ->', value, oldValue);
    // For testing the dom-if, remove me.
    setTimeout(() => {
      this.showChangedProp = true;
    }, 2000);
  }
}

window.customElements.define('px-app', PxApp);
