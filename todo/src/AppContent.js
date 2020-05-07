import { LitElement, html, css } from 'lit-element';

import './AppTodoList';
import './AppTodoElement';
import { append, read } from './storage';

export class AppContent extends LitElement {
  static get properties() {
    return {
      myTodos: { type: Array },
    };
  }

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
        <select id="category" name="category">
          <option value="Important">Important</option>
          <option value="Not so important">Not so important</option>
          <option value="Optional">Optional</option>
        </select>
        <app-todo-list
          id="list"
          .myTodos=${this.myTodos}
          name="todoList"
          @remove-todo=${this._onRemoveTodo}
        ></app-todo-list>
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
      this.myTodos = read();
      this.dispatchEvent(new CustomEvent('add-todo'));
    }
  }

  _onRemoveTodo() {
    this.dispatchEvent(new CustomEvent('remove-todo-main'));
  }
}

window.customElements.define('app-content', AppContent);
