import { LitElement, html, css } from 'lit-element';

export class AppContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
    `;
  }
  static get properties() {
    return {
      title: { type: String },
    };
  }
  render() {
    return html`
      <form>
        <label>
          Please choose a year:
          <input type="number" />
        </label>
        <button>OK</button>
      </form>
    `;
  }
}

window.customElements.define('app-content', AppContent);
