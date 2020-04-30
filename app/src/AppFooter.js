import { LitElement, html, css } from 'lit-element';

export class AppFooter extends LitElement {
  static get styles() {
    return css`
      footer {
        background: mediumseagreen;
        color: white;
        padding: 2rem;
      }
    `;
  }
  static get properties() {
    return {
      year: { type: Number },
    };
  }
  render() {
    return html`
      <footer>
        <h1>Copyright &copy ${this.year}</h1>
      </footer>
    `;
  }
}

window.customElements.define('app-footer', AppFooter);
