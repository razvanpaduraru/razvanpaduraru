import { LitElement, html, css } from 'lit-element';

import { read, append } from './storage';

export class BankLoginContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
      input[type='text'] {
        width: 20%;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 18px;
        background-color: white;
        box-sizing: border-box;
        border: 3px solid #ccc;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      input[type='text']:focus {
        border: 3px solid #555;
      }

      div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 70%;
      }

      label {
        color: black;
        font-size: 18px;
        padding: 8px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      button {
        background-color: white;
        color: black;
        padding: 15px 25px;
        border: 2px solid black;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      button:hover {
        background-color: black;
        color: white;
      }
    `;
  }

  render() {
    return html`
      <div>
        <form @submit=${this._onSubmit}>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Username" />
          <br />
          <label for="password">Password:</label>
          <input type="text" id="password" name="password" placeholder="Password" />
          <br />
          <button>LOGIN</button>
        </form>
      </div>
    `;
  }

  async _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const user = Object.fromEntries(data);
    console.log(user.username);
    const response = await fetch('http://localhost:8080/user/login', {
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
        username: user.username,
        password: user.password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const toAddData = {
        username: user.username,
        password: user.password,
        balance: data.balance,
        transactionResponseDTOS: data.transactionResponseDTOS,
      };
      const logged = read();
      const index = logged.findIndex(
        element => element.username == data.username && element.password == data.password
      );
      if (index !== -1) {
        console.log(data);
        this.dispatchEvent(new CustomEvent('already-logged'));
      } else if (data.username == null) {
        console.log(data);
        this.dispatchEvent(new CustomEvent('not-user'));
      } else {
        console.log('Success');
        append(toAddData);
        location.replace('user.html');
      }
    }
  }
}

window.customElements.define('bank-login-content', BankLoginContent);
