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
      .form-log {
        margin: auto;
        width: 30%;
        padding: 10px;
      }
      input[type='text'] {
        width: 100%;
        padding: 10px 20px;
        margin: 8px 0;
        font-size: 15px;
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

      h1 {
        font-size: 30px;
        padding-bottom: 20px;
        color: white;
      }

      input[type='text']:focus {
        border: 3px solid #555;
      }

      div {
        margin: 10% auto;
        border-radius: 5px;
        background: #7f7f7f;
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        width: 50%;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      label {
        color: #a52a2a;
        font-size: 22px;
        padding: 8px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      button {
        background-color: white;
        color: #a52a2a;
        padding: 12px 22px;
        border: 2px solid #a52a2a;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      button:hover {
        background-color: #a52a2a;
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      alreadyLogged: { type: String },
      userDoesNotExist: { type: String },
    };
  }

  constructor() {
    super();
    this.alreadyLogged = html``;
    this.userDoesNotExist = html``;
  }

  render() {
    return html`
      <div class="center">
        <form class="form-log" @submit=${this._onSubmit}>
          <h1>Login to homebank!</h1>
          ${this.alreadyLogged} ${this.userDoesNotExist}
          <p class="clearfix">
            <input type="text" id="username" name="username" placeholder="Username" />
          </p>
          <p class="clearfix">
            <input type="text" id="password" name="password" placeholder="Password" />
          </p>
          <p class="clearfix">
            <button type="submit" name="submit">LOGIN</button>
          </p>
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
        id: data.id,
        username: user.username,
      };
      const logged = read();
      const index = logged.findIndex(
        element => element.username == data.username && element.password == data.password
      );
      if (index !== -1) {
        this.dispatchEvent(new CustomEvent('already-logged'));
      } else if (data.username == null) {
        this.dispatchEvent(new CustomEvent('not-user'));
      } else {
        append(toAddData);
        location.replace('user.html');
      }
    }
  }
}

window.customElements.define('bank-login-content', BankLoginContent);
