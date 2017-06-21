'use strict';

import './template.html';

class PxApp extends window.Polymer.Element {
  static get is() {
    return 'px-app';
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'This is awesome!'
      }
    };
  }
}

window.customElements.define(PxApp.is, PxApp);
