import { LitElement, html, css } from 'lit-element';

import './AppTodoList';

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
  static get properties() {
    return {
      title: { type: String },
    };
  }
  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <input type="text" name="todo" placeholder="Todo" />
        <app-todoList></app-todoList>
        <button>OK</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);
    this.dispatchEvent(new CustomEvent('data-changed', { detail: data }));
  }
}

window.customElements.define('app-content', AppContent);
