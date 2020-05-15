import { LitElement, html, css } from 'lit-element';

import { read } from './storage';

export class BankUserTransactions extends LitElement {
  static get properties() {
    return {
      transactions: { type: Array },
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
      <button @click=${this._onShowTransactions}>Show transactions</button>
      ${this.text}
    `;
  }

  _onShowTransactions(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.text = html`
        <h2>
          Your transactions are :
        </h2>
        <ul>
          ${this.transactions.map(
            transaction =>
              html` <li>
                <fieldset>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value="${transaction.nameOfTransaction}"
                    readonly
                  />
                  <input
                    type="text"
                    name="sender"
                    id="sender"
                    value="${transaction.sender}"
                    readonly
                  />
                  <input
                    type="text"
                    name="receiver"
                    id="receiver"
                    value="${transaction.receiver}"
                    readonly
                  />
                  <input type="text" name="sum" id="sum" value="${transaction.sum}" readonly />
                </fieldset>
              </li>`
          )}
        </ul>
      `;
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
    }
  }
}

window.customElements.define('bank-user-transactions', BankUserTransactions);
