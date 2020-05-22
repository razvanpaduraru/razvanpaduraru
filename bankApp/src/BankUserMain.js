import { LitElement, html, css } from 'lit-element';

import './BankUserBalance';
import './BankUserTransactions';
import './BankUserSendMoney';
import { read, remove } from './storage';

export class BankUserMain extends LitElement {
  static get styles() {
    return css`
      h1 {
        color: white;
        width: fit-content;
      }

      h2 {
        width: fit-content; /*can be in percentage also.*/
        height: auto;
        margin: 0 0;
        position: relative;
        color: white;
      }

      button {
        background-color: #a52a2a; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
      }
      button {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      button:hover {
        background-color: white;
        color: #a52a2a;
      }
      div {
        margin: 10% auto;
        border-radius: 5px;
        background: #7f7f7f;
        background: rgba(0, 0, 0, 0.7);
        padding: 20px;
        width: 50%;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    `;
  }

  static get properties() {
    return {
      user: { type: Object },
      username: { type: String },
      balance: { type: Number },
      transactionResponseDTOS: { type: Array },
      logged: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.logged = false;
  }

  async getBalanceAndTransactions() {
    const response = await fetch('http://localhost:8080/user/' + this.id, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    if (response.ok) {
      const data = await response.json();
      this.transactionResponseDTOS = data.transactionResponseDTOS;
      this.balance = data.balance;
    }
  }

  render() {
    if (this.logged) {
      const logged = read();

      const index = logged.findIndex(element => element.username == this.username);
      const user = logged[index];

      this.user = user;
      this.username = user.username;
      this.id = user.id;

      this.getBalanceAndTransactions();
    } else {
      const logged = read();

      const user = logged[logged.length - 1];
      if (user !== undefined) {
        this.user = user;
        this.username = user.username;
        this.id = user.id;
        this.getBalanceAndTransactions();
        this.logged = true;
      }
    }

    return html`
      <div>
        <header>
          <h1>Welcome, ${this.username}!</h1>
          <h2>Please choose one of the following actions:</h2>
        </header>
        <br />
        <bank-user-balance
          .id=${this.id}
          .username=${this.username}
          .balance=${this.balance}
        ></bank-user-balance>
        <br />
        <bank-user-transactions
          .id=${this.id}
          .username=${this.username}
          .transactions=${this.transactionResponseDTOS}
        ></bank-user-transactions>
        <br />
        <bank-user-send-money
          .username=${this.username}
          .balance=${this.balance}
        ></bank-user-send-money>
        <br />
        <button @click=${this._onLogout}>LOGOUT</button>
      </div>
    `;
  }

  _onLogout(event) {
    event.preventDefault();
    remove(this.user);
    this.logged = false;
    this.dispatchEvent(new CustomEvent('logout-pressed'));
  }
}
