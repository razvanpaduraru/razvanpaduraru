import { LitElement, html, css } from 'lit-element';

import './TodoContent';
import './TodoList';
import './TodoElement';
import './TodoHeader';
import './CategoryLegend';
import { read } from './storage';

export class TodoMain extends LitElement {
  static get styles() {
    return css`
      .sticky {
        position: relative;
        top: 0;
        padding: 50px;
        font-size: 20px;
      }
    `;
  }

  static get properties() {
    return {
      numberOfTodos: { type: String },
    };
  }

  constructor() {
    super();
    this.numberOfTodos = 'no';
  }

  render() {
    return html`
      <div>
        <todo-header class="sticky" numberOfTodos="${this.numberOfTodos}"></todo-header>

        <todo-content
          class="content"
          @add-todo=${this._onAddTodo}
          @remove-todo-main=${this._onRemoveTodo}
        ></todo-content>
      </div>
    `;
  }

  _onAddTodo(event) {
    event.preventDefault();
    const todos = read();
    if (todos.length === 0) this.numberOfTodos = 'no';
    else if (todos.length === 1) this.numberOfTodos = '1';
    else this.numberOfTodos = todos.length;
  }

  _onRemoveTodo() {
    this.numberOfTodos = Number(this.numberOfTodos) - 1;
  }
}
