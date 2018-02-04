
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import './../sk-menu-item';

import css from './style.pcss';
import template from './template.html';

export default class SkHeader extends PolymerElement {

  static get template() {
    return `<style>${css}</style> ${template}`;
  }
}

window.customElements.define('sk-header', SkHeader);
