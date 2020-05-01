import { LitElement, html } from 'lit-element';

import './AppContent';
import './AppTodoList';
import './AppTodoElement';
import { read } from './storage';

export class AppMain extends LitElement {
  render() {
    return html` <app-content @add-todo=${this._onAddTodo}></app-content> `;
  }

  _onAddTodo(event) {
    event.preventDefault();
    console.log();
    const todos = read();
    const items = todos.map(
      element => `
    <app-todo-element todo=${element.todo} iden=${element.id}></app-todo-element>
    `
    );
    this.shadowRoot
      .querySelector('app-content')
      .shadowRoot.querySelector('app-todo-list')
      .shadowRoot.querySelector('ul').innerHTML = items.join('');
  }
}
