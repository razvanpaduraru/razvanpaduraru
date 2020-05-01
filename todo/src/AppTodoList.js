import { LitElement, html } from 'lit-element';

import './AppTodoElement';
import { remove } from './storage';
import './AppContent';

export class AppTodoList extends LitElement {
  render() {
    return html` <ul @click=${this._onRemoveTodo}></ul> `;
  }

  _onRemoveTodo(event) {
    event.preventDefault();
    const todo = {
      todo: event.target.todo,
      iden: event.target.iden,
    };
    const newTodos = remove(todo);
    const items = newTodos.map(
      element => `
    <app-todo-element todo=${element.todo} iden=${element.id}></app-todo-element>
    `
    );
    this.shadowRoot.querySelector('ul').innerHTML = items.join('');
  }
}

window.customElements.define('app-todo-list', AppTodoList);
