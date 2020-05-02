import { LitElement, html, css } from 'lit-element';

export class AppTodoElement extends LitElement {
  static get styles() {
    return css`
      fieldset {
        border: 0;
      }
      #todo {
        border: 0;
      }
    `;
  }
  static get properties() {
    return {
      todo: { type: Text },
      iden: { type: Number },
    };
  }
  render() {
    return html`
      <li>
        <fieldset>
          <input type="text" id="todo" value="${this.todo}" readonly />
          <input type="reset" name="remove" id="remove" value="Remove" />
        </fieldset>
      </li>
    `;
  }
}

window.customElements.define('app-todo-element', AppTodoElement);
