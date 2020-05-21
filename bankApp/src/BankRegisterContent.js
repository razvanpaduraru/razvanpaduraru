import { LitElement, html, css } from 'lit-element';

export class BankRegisterContent extends LitElement {
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

      .clearfix2 {
        margin: 0 100%;
      }
    `;
  }

  static get properties() {
    return {
      alreadyExists: { type: String },
    };
  }

  constructor() {
    super();
    this.alreadyExists = html``;
  }

  render() {
    return html`
      <div class="center">
        <form class="form-log" @submit=${this._onSubmit}>
          <h1>Register</h1>
          ${this.alreadyExists}
          <p class="clearfix">
            <input type="text" id="username" name="username" placeholder="Username" />
          </p>
          <p class="clearfix">
            <input type="text" id="password" name="password" placeholder="Password" />
          </p>
          <p class="clearfix">
            <input type="text" id="balance" name="balance" placeholder="Balance" />
          </p>
          <p class="clearfix">
            <button type="submit" name="submit">REGISTER</button>
          </p>
          <p class="clearfix2">
            <button type="submit" name="back">BACK</button>
          </p>
        </form>
      </div>
    `;
  }

  async _onSubmit(event) {
    event.preventDefault();
    console.log(event.path[2].activeElement.name);
    if (event.path[2].activeElement.name === 'back') {
      location.replace('index.html');
    } else {
      const form = event.target;
      const data = new FormData(form);
      const user = Object.fromEntries(data);
      console.log(user);
      if (user.username === '' || user.password === '' || user.balance === '') {
        this.userDoesNotExist = html`<h2 style="color : red">
          Please introduce valid credentials!
        </h2>`;
        this.dispatchEvent(new CustomEvent('invalid-credentials'));
      } else {
        const response = await fetch('http://localhost:8080/user', {
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
            balance: user.balance,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.username);
          if (data.username == null) {
            this.dispatchEvent(new CustomEvent('already-registered'));
          } else {
            this.dispatchEvent(new CustomEvent('succ-registered'));
          }
          console.log('Razspunsul este : ', data);
        }
      }
    }
  }
}

window.customElements.define('bank-register-content', BankRegisterContent);
