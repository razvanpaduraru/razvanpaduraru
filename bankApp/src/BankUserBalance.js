import { LitElement, html, css } from 'lit-element';

export class BankUserBalance extends LitElement {
  static get properties() {
    return {
      balance: { type: Number },
      text: { type: String },
      pressed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.text = html``;
    this.pressed = false;
  }

  render() {
    return html`
      <button @click=${this._onShowBalance}>Show balance</button>
      ${this.text}
    `;
  }

  _onShowBalance(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.text = html`<h2>You have an amount of : ${this.balance}.</h2>`;
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
    }
  }
}

window.customElements.define('bank-user-balance', BankUserBalance);
