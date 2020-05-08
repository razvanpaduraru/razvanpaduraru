import { LitElement, html, css } from 'lit-element';

export class CategoryLegend extends LitElement {
  static get styles() {
    return css`
      :host {
        float: right;
        position: fixed;
        right: 10%;
        top: 15%;
        border: 2px solid black;
        padding: 15px 25px;
        font-size: 20px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }
      #important {
        background: crimson;
        color: white;
        width: fit-content;
        padding: 5px 15px;
      }
      #nsimportant {
        background: dodgerblue;
        color: white;
        width: fit-content;
        padding: 5px 15px;
      }
      #optional {
        background: darkolivegreen;
        color: white;
        width: fit-content;
        padding: 5px 15px;
      }

      h2 {
        border-bottom: 2px solid black;
        width: fit-content;
        color: black;
      }
    `;
  }

  render() {
    return html`
      <div>
        <h2>Legend</h1>
        <p id="important">
          Important
        </p>
        <p id="nsimportant">
          Not So Important
        </p>
        <p id="optional">
          Optional
        </p>
      </div>
    `;
  }
}

window.customElements.define('category-legend', CategoryLegend);
