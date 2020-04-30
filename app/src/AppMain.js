import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  static get properties() {
    return {
      title: { type: Text },
      year: { type: Number },
    };
  }

  constructor() {
    super();
    this.year = 2020;
    this.title = 'My app';
  }

  render() {
    return html`
      <app-header title=${this.title}></app-header>
      <app-content @data-changed=${this._onDataChanged}></app-content>
      <app-footer year=${this.year}></app-footer>
    `;
  }

  _onDataChanged(event) {
    console.log(event.detail.title);
    if (event.detail.title !== '') {
      this.title = event.detail.title;
    }

    if (event.detail.year !== '') {
      this.year = event.detail.year;
    }
  }
}
