import { LitElement, html } from 'lit-element';

import './BankUserBalance';
import './BankUserTransactions';
import { read, remove } from './storage';

export class BankUserMain extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      username: { type: String },
      balance: { type: Number },
      transactionResponseDTOS: { type: Array },
    };
  }

  render() {
    const logged = read();

    const user = logged[logged.length - 1];

    this.user = user;
    this.username = user.username;
    this.balance = user.balance;
    this.transactionResponseDTOS = user.transactionResponseDTOS;

    console.log(this.user);

    return html`
      <header>
        <h1>Welcome, ${this.username}!</h1>
      </header>
      <bank-user-balance balance=${this.balance}></bank-user-balance>
      <bank-user-transactions
        .transactions=${this.transactionResponseDTOS}
      ></bank-user-transactions>
      <button @click=${this._onLogout}>LOGOUT</button>
    `;
  }

  _onLogout(event) {
    event.preventDefault();
    remove(this.user);
    location.replace('index.html');
  }
}
