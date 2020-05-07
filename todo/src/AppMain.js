import { LitElement, html } from 'lit-element';

import './AppContent';
import './AppTodoList';
import './AppTodoElement';
import './AppHeader';
import './AppFooter';
import { read } from './storage';

export class AppMain extends LitElement {
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
      <app-header numberOfTodos="${this.numberOfTodos}"></app-header>
      <app-content
        @add-todo=${this._onAddTodo}
        @remove-todo-main=${this._onRemoveTodo}
      ></app-content>
      <app-footer></app-footer>
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
