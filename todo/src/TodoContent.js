import { LitElement, html, css } from 'lit-element';

import './TodoList';
import './TodoElement';
import { append, read } from './storage';

export class TodoContent extends LitElement {
  static get properties() {
    return {
      myTodos: { type: Array },
      location: { type: String },
    };
  }

  constructor() {
    super();
    this.location = 'No todo added yet!';
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

      p {
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
        <p>${this.location}</p>
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

  async fetchAddress(latitude, longitude) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  }

  async success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const address = await this.fetchAddress(crd.latitude, crd.longitude);
    this.location = 'Todo added from : ' + address.display_name;
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  _onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    data.set('id', Date.now());

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error, options);
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
