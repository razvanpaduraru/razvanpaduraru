import { LitElement, html, css } from 'lit-element';

import './BankLoginMain';
import './BankRegisterMain';
import './BankUserMain';

class BankMain extends LitElement {
  static get properties() {
    return {
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = window.location.hash.substring(1);
    console.log(this.page);
    window.onhashchange = this._onHashChange.bind(this);
  }

  render() {
    return html` ${this._pageTemplate} `;
  }

  _onChangeMenu(event) {
    console.log(2);
  }

  _onHashChange(event) {
    console.log(event);
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }

  get _pageTemplate() {
    if (this.page === '') {
      return html`<bank-login-main
        @register-pressed-main=${this._onRegisterPressed}
        @login-pressed-main=${this._onLoginPressed}
      ></bank-login-main>`;
    }
    if (this.page === 'register') {
      return html`<bank-register-main
        @back-pressed-main=${this._onBackPressed}
      ></bank-register-main>`;
    }
    if (this.page === 'user') {
      return html`<bank-user-main @logout-pressed=${this._onLogoutPressed}></bank-user-main>`;
    }
  }

  _onLoginPressed(event) {
    event.preventDefault();
    window.location.hash = 'user';
  }

  _onLogoutPressed(event) {
    event.preventDefault();
    window.location.hash = '';
  }

  _onBackPressed(event) {
    event.preventDefault();
    window.location.hash = '';
  }

  _onRegisterPressed(event) {
    event.preventDefault();
    window.location.hash = 'register';
  }
}

window.customElements.define('bank-main', BankMain);
