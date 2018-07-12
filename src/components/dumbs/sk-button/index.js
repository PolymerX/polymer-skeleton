
import {PolymerElement, html} from '@polymer/polymer/polymer-element';

import css from './style.pcss';
import template from './template.html';

export default class SkButton extends PolymerElement {
  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }
}

window.customElements.define('sk-button', SkButton);
