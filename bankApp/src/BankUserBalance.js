import { LitElement, html, css } from 'lit-element';

export class BankUserBalance extends LitElement {
  static get styles() {
    return css`
      div {
        width: 40%;
        height: auto;
        margin: 0 39%;
        position: relative;
      }
      h2 {
        color: white;
        margin: 10% -15%;
      }
      button {
        background-color: #a52a2a;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
      }
      button {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      button:hover {
        background-color: white;
        color: #a52a2a;
      }
    `;
  }

  static get properties() {
    return {
      id: { type: Number },
      username: { type: String },
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
    if (this.pressed === true) {
      this.getBalance();
      return html`
        <div>
          <button @click=${this._onShowBalance}>Show balance</button>
          <h2>You have an amount of : ${this.balance}.</h2>
        </div>
      `;
    } else {
      return html`
        <div>
          <button @click=${this._onShowBalance}>Show balance</button>
          ${this.text}
        </div>
      `;
    }
  }

  async getBalance() {
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
      this.balance = data.balance;
    }
  }

  _onShowBalance(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.getBalance();
      this.text = html`<h2>You have an amount of : ${this.balance}.</h2>`;
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
    }
  }
}

window.customElements.define('bank-user-balance', BankUserBalance);
