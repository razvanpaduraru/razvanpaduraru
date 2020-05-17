import { LitElement, html } from 'lit-element';

import './BankLoginContent';

export class BankLoginMain extends LitElement {
  static get properties() {
    return {
      alreadyLogged: { type: String },
      userDoesNotExist: { type: String },
    };
  }

  constructor() {
    super();
    this.alreadyLogged = html``;
    this.userDoesNotExist = html``;
  }

  render() {
    return html`
      <bank-login-content
        .alreadyLogged=${this.alreadyLogged}
        .userDoesNotExist=${this.userDoesNotExist}
        @already-logged=${this._onAlreadyLogged}
        @not-user=${this._onNotUser}
      ></bank-login-content>
    `;
  }

  _onAlreadyLogged(event) {
    event.preventDefault();
    console.log('Aici');
    this.alreadyLogged = html`<h2 style="color : red">User already logged in!</h2>`;
    this.userDoesNotExist = html``;
  }

  _onNotUser(event) {
    event.preventDefault();
    this.userDoesNotExist = html`<h2 style="color : red">User does not exist!</h2>`;
    this.alreadyLogged = html``;
  }
}
