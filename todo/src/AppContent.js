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
        <input type="text" name="todo" placeholder="Todo" />
        <app-todo-list id="list" name="todoList"></app-todo-list>
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
}

window.customElements.define('app-content', AppContent);
