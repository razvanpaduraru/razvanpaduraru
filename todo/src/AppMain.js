import { LitElement, html } from 'lit-element';

import './AppContent';
import './AppTodoList';
import './AppTodoElement';
import './AppHeader';
import { read } from './storage';

export class AppMain extends LitElement {
  static get properties() {
    return {
      numberOfTodos: { type: Text },
      verb: { type: Text },
      todo: { type: Text },
    };
  }

  constructor() {
    super();
    this.numberOfTodos = 'no';
    this.verb = 'are';
    this.todo = 'todos';
  }

  render() {
    return html`
      <app-header
        verb="${this.verb}"
        numberOfTodos="${this.numberOfTodos}"
        todo="${this.todo}"
      ></app-header>
      <app-content
        @add-todo=${this._onAddTodo}
        @remove-todo-main=${this._onRemoveTodo}
      ></app-content>
    `;
  }

  _onAddTodo(event) {
    event.preventDefault();
    const todos = read();
    if (todos.length === 0) this.numberOfTodos = 'no';
    else if (todos.length === 1) {
      this.verb = 'is';
      this.numberOfTodos = '1';
      this.todo = 'todo';
    } else {
      this.numberOfTodos = todos.length;
      this.todo = 'todos';
      this.verb = 'are';
    }
    const items = todos.map(
      element => `
    <app-todo-element todo="${element.todo}" iden=${element.id}></app-todo-element>
    `
    );
    this.shadowRoot
      .querySelector('app-content')
      .shadowRoot.querySelector('app-todo-list')
      .shadowRoot.querySelector('ul').innerHTML = items.join('');
  }

  _onRemoveTodo() {
    this.numberOfTodos = Number(this.numberOfTodos) - 1;
    if (this.numberOfTodos === 0) {
      this.numberOfTodos = 'no';
      this.todo = 'todos';
      this.verb = 'are';
    } else if (this.numberOfTodos === 1) {
      this.verb = 'is';
      this.numberOfTodos = '1';
      this.todo = 'todo';
    }
  }
}
