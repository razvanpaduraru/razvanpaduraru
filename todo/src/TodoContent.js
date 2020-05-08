import { LitElement, html, css } from 'lit-element';

import './TodoList';
import './TodoElement';
import { append, read } from './storage';

export class TodoContent extends LitElement {
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
      input[type='text'] {
        width: 20%;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 18px;
        background-color: white;
        box-sizing: border-box;
        border: 3px solid #ccc;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      input[type='text']:focus {
        border: 3px solid #555;
      }

      div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 70%;
      }

      select {
        width: 20%;
        font-size: 18px;
        padding: 16px 20px;
        border-radius: 4px;
        background-color: white;
        color: black;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      label {
        color: black;
        font-size: 18px;
        padding: 8px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      button {
        background-color: white;
        color: black;
        padding: 15px 25px;
        border: 2px solid black;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      button:hover {
        background-color: black;
        color: white;
      }
    `;
  }

  render() {
    return html`
      <div>
        <form @submit=${this._onSubmit}>
          <label for="todo">Write here the TODO you want to insert:</label>
          <input type="text" id="todo" name="todo" placeholder="Todo" />
          <br />
          <label for="category">And choose its category please:</label>
          <select id="category" name="category">
            <option id="option1" value="Important">Important</option>
            <option id="option2" value="Not so important">Not so important</option>
            <option id="option3" value="Optional">Optional</option>
          </select>
          <todo-list
            id="list"
            .myTodos=${this.myTodos}
            name="todoList"
            @remove-todo=${this._onRemoveTodo}
          ></todo-list>
          <br />
          <br />
          <button>ADD</button>
        </form>
      </div>
      <category-legend></category-legend>
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

window.customElements.define('todo-content', TodoContent);
