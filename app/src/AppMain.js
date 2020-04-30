import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  static get properties() {
    return {
      year: { type: Number },
    };
  }

  constructor() {
    super();
    this.year = 2020;
  }

  render() {
    return html`
      <app-header title="My app"></app-header>
      <app-content @year-changed=${this._onYearChanged}></app-content>
      <app-footer year=${this.year}></app-footer>
    `;
  }

  _onYearChanged(event) {
    this.year = event.detail.year;
  }
}
