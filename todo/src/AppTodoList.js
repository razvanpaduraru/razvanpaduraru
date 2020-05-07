import { LitElement, html } from 'lit-element';

import './AppTodoElement';
import { remove } from './storage';

export class AppTodoList extends LitElement {
  static get properties() {
    return {
      myTodos: { type: Array },
    };
  }
  render() {
    return html`
      <ul @click=${this._onRemoveTodo}>
        ${this.myTodos.map(
          element =>
            html`<li>
              <app-todo-element
                .category="${element.category}"
                .todo="${element.todo}"
                .iden=${element.id}
              ></app-todo-element>
            </li>`
        )}
      </ul>
    `;
  }

  _onRemoveTodo(event) {
    event.preventDefault();
    if (event.path[0].name === 'remove') {
      const todo = {
        todo: event.target.todo,
        iden: event.target.iden,
      };
      this.myTodos = remove(todo);
      this.dispatchEvent(new CustomEvent('remove-todo'));
    }
  }
}

window.customElements.define('app-todo-list', AppTodoList);
