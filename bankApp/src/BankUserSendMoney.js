import { LitElement, html, css } from 'lit-element';

export class BankUserSendMoney extends LitElement {
  static get styles() {
    return css`
      div {
        width: 20%; /*can be in percentage also.*/
        height: auto;
        margin: 0 37.8%;
        position: relative;
      }

      .form-send {
        margin: auto;
        width: 100%;
        padding: 10px;
      }
      input[type='text'] {
        width: 100%;
        padding: 10px 20px;
        margin: 8px 0;
        font-size: 12px;
        background-color: white;
        box-sizing: border-box;
        border: 3px solid #a52a2a;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      ::placeholder {
        color: #a52a2a;
      }

      input[type='text']:focus {
        border: 3px solid #555;
      }

      .bigButton {
        margin: auto;
        width: 100%;
        padding: 40%;
      }
      .bigButton {
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
      .bigButton {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .bigButton:hover {
        background-color: white;
        color: #a52a2a;
      }

      .send {
        margin: auto;
        width: 50%;
        padding: 40%;
      }
      .send {
        background-color: #a52a2a; /* Green */
        border: none;
        color: white;
        padding: 5px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
      }
      .send {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .send:hover {
        background-color: white;
        color: #a52a2a;
      }
    `;
  }

  static get properties() {
    return {
      username: { type: String },
      balance: { type: Number },
      text: { type: String },
      pressed: { type: Boolean },
      notEnoughMoney: { type: String },
      invalidSender: { type: String },
      invalidReciever: { type: String },
      invalidName: { type: String },
      transactionsSucc: { type: String },
    };
  }

  constructor() {
    super();
    this.text = html``;
    this.pressed = false;
    this.notEnoughMoney = html``;
    this.invalidSender = html``;
    this.invalidReciever = html``;
    this.invalidName = html``;
    this.transactionsSucc = html``;
  }

  render() {
    return html`
      <div>
        <button class="bigButton" @click=${this._onSendMoney}>Send Money</button>
        ${this.text} ${this.notEnoughMoney} ${this.invalidSender} ${this.invalidReciever}
        ${this.invalidName} ${this.transactionsSucc}
      </div>
    `;
  }

  _onSendMoney(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.text = html` <form class="form-send" @submit=${this._onSubmit}>
        <input type="text" name="name" id="name" placeholder="Transaction's name" />
        <input type="text" name="sender" id="sender" placeholder="Sender" />
        <input type="text" name="receiver" id="receiver" placeholder="Receiver" />
        <input type="text" name="sum" id="sum" placeholder="Sum" />
        <button class="send">Send</button>
      </form>`;
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
      this.notEnoughMoney = html``;
      this.invalidSender = html``;
      this.invalidReciever = html``;
      this.invalidName = html``;
      this.transactionsSucc = html``;
    }
  }

  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const request = Object.fromEntries(data);
    if (request.name === '') {
      this.invalidName = html`<h2 style="color: red">Invalid transaction name!</h2>`;
    } else {
      const response = await fetch('http://localhost:8080/user/verifyRecv', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          username: request.receiver,
        }),
      });
      if (response.ok) {
        const recv = await response.json();
        if (this.username !== request.sender) {
          this.invalidSender = html`<h2 style="color: red">Invalid sender!</h2>`;
          this.notEnoughMoney = html``;
          this.invalidReciever = html``;
          this.invalidName = html``;
        } else if (recv.id == null) {
          this.invalidReciever = html`<h2 style="color: red">Invalid receiver!</h2>`;
          this.notEnoughMoney = html``;
          this.invalidSender = html``;
          this.invalidName = html``;
        } else if (this.balance >= request.sum) {
          const response = await fetch('http://localhost:8080/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
              nameOfTransaction: request.name,
              sender: request.sender,
              receiver: request.receiver,
              sum: request.sum,
            }),
          });
          this.notEnoughMoney = html``;
          this.invalidReciever = html``;
          this.invalidSender = html``;
          this.invalidName = html``;
          this.transactionsSucc = html`<h2 style="color: red">Transaction successful!</h2>`;
        } else {
          this.notEnoughMoney = html`<h2 style="color: red">Not enough founds!</h2>`;
          this.invalidSender = html``;
          this.invalidReciever = html``;
          this.invalidName = html``;
        }
      }
    }
  }
}

window.customElements.define('bank-user-send-money', BankUserSendMoney);
