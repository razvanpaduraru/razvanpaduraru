import { LitElement, html, css } from 'lit-element';

export class AppHeader extends LitElement {
  static get styles() {
    return css`
      h2 {
        background: dodgerblue;
        color: white;
        width: fit-content;
      }
    `;
  }

  static get properties() {
    return {
      numberOfTodos: { type: Text },
      verb: { type: Text },
      todo: { type: Text },
    };
  }

  render() {
    return html`
      <header>
        <h1>TODO List</h1>
        <h2>
          There ${this.verb} ${this.numberOfTodos} unfinished ${this.todo}!
        </h2>
      </header>
    `;
  }
}

window.customElements.define('app-header', AppHeader);
