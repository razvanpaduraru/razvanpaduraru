import { LitElement, html, css } from 'lit-element';

class IaAir extends LitElement {
  static get styles() {
    return css`
      section {
        background: #ddd;
        box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
        margin-bottom: 2rem;
        padding: 1rem;
      }
    `;
  }

  static get properties() {
    return {
      info: { type: String },
    };
  }

  constructor() {
    super();
    this.info = '--';
  }

  render() {
    return html`
      <section>
        <h1>Informations</h1>
        <p>
          <strong>${this.info}</strong>
        </p>
      </section>
      <p>
        <button @click=${this._onClickUpdate}><b>UPDATE</b></button>
      </p>
    `;
  }

  _onClickUpdate(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(this._onGeoSuccess.bind(this), this._onGeoError);
  }

  async _onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const base = 'https://nominatim.openstreetmap.org/reverse';
    const result = await fetch(`${base}?lat=${lat}&lon=${lon}&format=json`);
    const data = await result.json();
    const city = data.display_name
      .split(',')[2]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const base2 = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const end = '&APPID=e03c3b32cfb5a6f7069f2ef29237d87e&units=metric';
    const weather = await fetch(`${base2}${city}${end}`);
    const dataW = await weather.json();
    const humidity = dataW.main.humidity;
    const pressure = dataW.main.pressure;

    this.info = 'Air pressure is : ' + `${pressure}` + ' and humidity is : ' + `${humidity}`;
  }

  _onGeoError() {
    alert('Unable to retrieve current location');
  }
}

window.customElements.define('ia-air', IaAir);
