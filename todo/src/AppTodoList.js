import { LitElement, html } from 'lit-element';

import './AppTodoElement';

export class AppTodoList extends LitElement {
  //   static get styles() {
  //     return css`
  //       :host {
  //         display: block;
  //         padding: 2rem;
  //         height: 5rem;
  //       }
  //     `;
  //   }
  //   static get properties() {
  //     return {
  //       name: { type: String },
  //       id: { type: Number },
  //     };
  //   }
  render() {
    return html`
      <ul>
        <app-TodoElement name="TodoList"></app-TodoElement>
      </ul>
    `;
  }
}

window.customElements.define('app-todoList', AppTodoList);
