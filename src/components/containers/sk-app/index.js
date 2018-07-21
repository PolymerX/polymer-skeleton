
import {LitElement, html} from '@polymer/lit-element';

import css from './style.pcss';
import template from './template';
import '../../dumbs/sk-button';

export default class SkApp extends LitElement {
  static get properties() {
    return {
      name: String,
      appVersion: String,
      ENV: String,
      updateReady: Boolean
    };
  }

  _render(props) {
    return html`<style>${css}</style> ${template(props)}`;
  }

  constructor() {
    super();

    this.appVersion = process.env.appVersion;
    this.ENV = process.env.NODE_ENV;
    this.updateReady = false;

    document.addEventListener('updateReady', () => {
      this.updateReady = true;
    });
  }

  startTour() {
    window.location.replace('https://github.com/PolymerX/polymer-skeleton');
  }

  reload() {
    window.location.reload();
  }
}

window.customElements.define('sk-app', SkApp);
