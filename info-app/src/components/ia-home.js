import { LitElement, html, css } from 'lit-element';

class IaHome extends LitElement {
  static get styles() {
    return css`
      section {
        background: #ddd;
        box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
        margin-bottom: 2rem;
        padding: 1rem;
      }
    `;
  }

  static get properties() {
    return {
      info: { type: String },
    };
  }

  constructor() {
    super();
    this.info = '';
  }

  render() {
    return html`
      <section>
        <h1>Current bitcoin course</h1>
        <p>
          <strong>${this.info}</strong>
        </p>
      </section>

      <p>
        <button @click=${this._onClickUpdate}><b>UPDATE</b></button>
      </p>
    `;
  }

  async _onClickUpdate(event) {
    event.preventDefault();
    const base = 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json';
    const result = await fetch(`${base}`);
    const data = await result.json();
    const usd = data.bpi.USD.rate;
    const eur = data.bpi.EUR.rate;
    this.info = 'Bitcoin is ' + `${eur}` + ' EURO and ' + `${usd}` + ' USD';
  }
}

window.customElements.define('ia-home', IaHome);
