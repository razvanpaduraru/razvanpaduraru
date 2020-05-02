import { LitElement, html, css } from 'lit-element';

import './AppTodoList';
import './AppTodoElement';
import { append } from './storage';

export class AppContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
    `;
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        Write here the TODO you want to insert :
        <input type="text" name="todo" placeholder="Todo" />
        <app-todo-list id="list" name="todoList" @remove-todo=${this._onRemoveTodo}></app-todo-list>
        <button>ADD</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());
    const todo = Object.fromEntries(data);
    if (todo.todo !== '') {
      append(todo);
      this.dispatchEvent(new CustomEvent('add-todo'));
    }
  }

  _onRemoveTodo() {
    this.dispatchEvent(new CustomEvent('remove-todo-main'));
  }
}

window.customElements.define('app-content', AppContent);
