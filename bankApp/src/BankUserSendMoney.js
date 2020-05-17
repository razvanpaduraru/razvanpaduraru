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
      label {
        color: white;
      }

      button {
        margin: auto;
        width: 100%;
        padding: 40%;
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
      username: { type: String },
      balance: { type: Number },
      text: { type: String },
      pressed: { type: Boolean },
      notEnoughMoney: { type: String },
      invalidSender: { type: String },
      invalidReciever: { type: String },
    };
  }

  constructor() {
    super();
    this.text = html``;
    this.pressed = false;
    this.notEnoughMoney = html``;
    this.invalidSender = html``;
    this.invalidReciever = html``;
  }

  render() {
    return html`
      <div>
        <button @click=${this._onSendMoney}>Send Money</button>
        ${this.text} ${this.notEnoughMoney} ${this.invalidSender} ${this.invalidReciever}
      </div>
    `;
  }

  _onSendMoney(event) {
    event.preventDefault();
    if (this.pressed === false) {
      this.text = html` <form @submit=${this._onSubmit}>
        <label for="name">Name of Transaction:</label>
        <input type="text" name="name" id="name" placeholder="Name of Your Transaction" />
        <input type="text" name="sender" id="sender" placeholder="Sender" />
        <input type="text" name="receiver" id="receiver" placeholder="Receiver" />
        <input type="text" name="sum" id="sum" placeholder="Sum" />
        <button>Send</button>
      </form>`;
      this.pressed = true;
    } else {
      this.text = html``;
      this.pressed = false;
    }
  }

  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const request = Object.fromEntries(data);
    console.log(request);
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
      if (recv.id == null) {
        this.invalidReciever = html`<h2 style="color: red">Invalid receiver!</h2>`;
        this.notEnoughMoney = html``;
        this.invalidSender = html``;
      } else if (this.username !== request.sender) {
        this.invalidSender = html`<h2 style="color: red">Invalid sender!</h2>`;
        this.notEnoughMoney = html``;
        this.invalidReciever = html``;
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
      } else {
        this.notEnoughMoney = html`<h2 style="color: red">Not enough founds!</h2>`;
        this.invalidSender = html``;
        this.invalidReciever = html``;
      }
    }
  }
}

window.customElements.define('bank-user-send-money', BankUserSendMoney);
