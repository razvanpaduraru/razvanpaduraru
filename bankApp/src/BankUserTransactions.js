import { LitElement, html, css } from 'lit-element';

export class BankUserTransactions extends LitElement {
  static get styles() {
    return css`
      div {
        width: 30%; /*can be in percentage also.*/
        height: auto;
        margin: 0 38%;
        position: relative;
      }
      h2 {
        color: white;
        width: 100%;
        margin: 5% -10%;
      }
      legend {
        color: white;
        background-color: #a52a2a;
        border-radius: 5px;
        padding: 8px;
      }
      fieldset {
        padding: 20px;
        width: 100%;
        border-radius: 10px;
      }
      label {
        color: white;
        padding: 5px;
        font-size: 20px;
      }
      input {
        background-color: white;
        color: #a52a2a;
        padding: 8px;
        text-align: center;
        border: 3px solid #a52a2a;
      }
      ul {
        list-style: none;
      }

      li {
        padding: 10px;
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
    `;
  }

  static get properties() {
    return {
      id: { type: Number },
      username: { type: String },
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

  async getTransactions() {
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
      this.transactions = data.transactionResponseDTOS;
    }
  }

  render() {
    if (this.pressed === true) {
      this.getTransactions();
      if (this.transactions.length === 0) {
        return html`
          <div>
            <button @click=${this._onShowTransactions}>Show transactions</button>
            <h2>
              You have no transactions!
            </h2>
          </div>
        `;
      }
      return html`
        <div>
          <button @click=${this._onShowTransactions}>Show transactions</button>
          <h2>
            Your transactions are :
          </h2>
          <ul>
            ${this.transactions.map(
              transaction =>
                html` <li>
                  <fieldset>
                    <legend>${transaction.nameOfTransaction}</legend>
                    <label for="sender">Sender</label>
                    <input
                      type="text"
                      name="sender"
                      id="sender"
                      value="${transaction.sender}"
                      readonly
                    />
                    <br />
                    <br />
                    <label for="receiver">Receiver</label>
                    <input
                      type="text"
                      name="receiver"
                      id="receiver"
                      value="${transaction.receiver}"
                      readonly
                    />
                    <br />
                    <br />
                    <label for="sum">Transfered sum</label>
                    <input type="text" name="sum" id="sum" value="${transaction.sum}" readonly />
                  </fieldset>
                </li>`
            )}
          </ul>
        </div>
      `;
    } else {
      return html`
        <div>
          <button @click=${this._onShowTransactions}>Show transactions</button>
          ${this.text}
        </div>
      `;
    }
  }

  _onShowTransactions(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.getTransactions();
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
    }
  }
}

window.customElements.define('bank-user-transactions', BankUserTransactions);
