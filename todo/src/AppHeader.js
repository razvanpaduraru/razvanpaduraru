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
      numberOfTodos: { type: String },
      verb: { type: String },
      todo: { type: String },
    };
  }

  constructor() {
    super();
    this.numberOfTodos = 'no';
    this.verb = 'are';
    this.todo = 'todos';
  }

  render() {
    if (this.numberOfTodos === '1') {
      this.verb = 'is';
      this.todo = 'todo';
    } else if (this.numberOfTodos !== '0') {
      this.todo = 'todos';
      this.verb = 'are';
    } else {
      this.numberOfTodos = 'no';
      this.todo = 'todos';
      this.verb = 'are';
    }
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
