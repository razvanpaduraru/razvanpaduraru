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
      todo: { type: String },
      category: { type: String },
      iden: { type: Number },
    };
  }
  render() {
    console.log(this.category);
    let color = 'black';
    if (this.category === 'Important') {
      color = 'red';
    } else if (this.category === 'Not so important') {
      color = 'blue';
    } else {
      color = 'green';
    }
    return html`
      <fieldset id=${this.iden}>
        <input
          style="background-color: ${color};"
          type="text"
          id="todo"
          value="${this.todo}"
          readonly
        />
        <input type="reset" name="remove" id="remove" value="Remove" />
      </fieldset>
    `;
  }

  // updated(changedProperties) {
  //   if (changedProperties.has('category')) {
  //     console.log('aici');
  //     this.style.backgroundColor = 'red';
  //   }
  // }
}

window.customElements.define('app-todo-element', AppTodoElement);
