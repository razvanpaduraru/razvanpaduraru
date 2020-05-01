import { LitElement, html } from 'lit-element';

export class AppTodoElement extends LitElement {
  //   static get styles() {
  //     return css`
  //       :host {
  //         display: block;
  //         padding: 2rem;
  //         height: 5rem;
  //       }
  //     `;
  //   }
  static get properties() {
    return {
      name: { type: String },
      id: { type: Number },
    };
  }
  render() {
    return html`
      <li>
        <fieldset name="${'fieldset' + this.id}">
          <input type="text" id="todo" name="todo" value="${this.name}" readonly />
          <input type="reset" id="remove" name="remove" value="Remove" />
        </fieldset>
      </li>
    `;
  }
}

window.customElements.define('app-todoElement', AppTodoElement);
