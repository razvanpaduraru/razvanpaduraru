import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  render() {
    return html`
      <app-header title="My app"></app-header>
      <app-content></app-content>
      <app-footer year="2020"></app-footer>
    `;
  }
}
