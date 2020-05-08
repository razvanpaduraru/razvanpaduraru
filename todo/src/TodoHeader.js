import { LitElement, html, css } from 'lit-element';

export class TodoHeader extends LitElement {
  static get styles() {
    return css`
      h1 {
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      h2 {
        background: black;
        color: white;
        width: fit-content;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        padding: 10px 25px;
      }
      header {
        padding: 60px;
        text-align: center;
        color: black;
        font-size: 30px;
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

window.customElements.define('todo-header', TodoHeader);
