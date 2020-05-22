import { LitElement, html } from 'lit-element';

import './BankRegisterContent';

export class BankRegisterMain extends LitElement {
  static get properties() {
    return {
      alreadyExists: { type: String },
    };
  }

  constructor() {
    super();
    this.alreadyLogged = html``;
  }

  render() {
    return html`
      <bank-register-content
        .alreadyExists=${this.alreadyExists}
        @already-registered=${this._onAlreadyRegistered}
        @succ-registered=${this._succReg}
        @invalid-credentials=${this._invalidCred}
        @back-pressed=${this._onBackPressed}
      ></bank-register-content>
    `;
  }

  _onBackPressed(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('back-pressed-main'));
  }

  _onAlreadyRegistered(event) {
    event.preventDefault();
    console.log('Aici');
    this.alreadyExists = html`<h2 style="color : red">User already exists!</h2>`;
  }

  _succReg(event) {
    event.preventDefault();
    this.alreadyExists = html`<h2 style="color : red">User successfully created!</h2>`;
  }

  _invalidCred(event) {
    event.preventDefault();
    this.alreadyExists = html`<h2 style="color : red">
      Please introduce valid credentials!
    </h2>`;
  }
}
