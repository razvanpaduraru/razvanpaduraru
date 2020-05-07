import { LitElement, html, css } from 'lit-element';

export class AppFooter extends LitElement {
  static get styles() {
    return css`
      #important {
        background: red;
        color: white;
        width: fit-content;
      }
      #nsimportant {
        background: blue;
        color: white;
        width: fit-content;
      }
      #optional {
        background: green;
        color: white;
        width: fit-content;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <h1>Legend</h1>
        <h2 id="important">
          Important
        </h2>
        <h2 id="nsimportant">
          Not So Important
        </h2>
        <h2 id="optional">
          Optional
        </h2>
      </footer>
    `;
  }
}

window.customElements.define('app-footer', AppFooter);
