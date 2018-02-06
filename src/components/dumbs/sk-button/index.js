
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class SkButton extends PolymerElement {
  static get template() {
    return `
      <style>${css}</style> ${template}`;
  }
}

window.customElements.define('sk-button', SkButton, {extends: 'button'});
