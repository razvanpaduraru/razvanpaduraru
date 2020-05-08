import { LitElement, html, css } from 'lit-element';

export class TodoElement extends LitElement {
  static get styles() {
    return css`
      fieldset {
        border: 2px solid black;
        width: fit-content;
      }
      #todo {
        color: white;
        padding: 8px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      input[type='reset'] {
        background-color: white;
        border: none;
        color: black;
        padding: 10px 20px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
        border: 2px solid black;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      input[type='reset']:hover {
        background-color: black;
        color: white;
      }
    `;
  }
  static get properties() {
    return {
      todo: { type: String },
      category: { type: String },
      iden: { type: Number },
    };
  }
  render() {
    console.log(this.category);
    let color = 'black';
    if (this.category === 'Important') {
      color = 'crimson';
    } else if (this.category === 'Not so important') {
      color = 'dodgerblue';
    } else {
      color = 'darkolivegreen';
    }
    return html`
      <fieldset id=${this.iden} style="background-color: ${color}">
        <div style="width: fit-content;" id="todo">${this.todo}</div>
        <input type="reset" name="remove" id="remove" value="Remove" />
      </fieldset>
      <br />
    `;
  }
}

window.customElements.define('todo-element', TodoElement);
