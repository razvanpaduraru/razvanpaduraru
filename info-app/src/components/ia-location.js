import { LitElement, html, css } from 'lit-element';

class IaLocation extends LitElement {
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
      lat: { type: String },
      lon: { type: String },
      alt: { type: String },
      adr: { type: String },
      timeGeo: { type: String },
      timeAdr: { type: String },
    };
  }

  render() {
    return html`
      <section>
        <h1>Coordinates</h1>
        <p>
          <strong>Latitude:</strong> ${this.lat || '--'} <br />
          <strong>Longitude:</strong> ${this.lon || '--'} <br />
          <strong>Altitude:</strong> ${this.alt || '--'}<br />
        </p>
        <p>
          Last updated: ${this.timeGeo || '--'}
        </p>
      </section>

      <section>
        <h1>Address</h1>
        <p>${this.adr || '--'}</p>
        <p>
          Last updated: ${this.timeAdr || '--'}
        </p>
      </section>

      <p>
        <button @click=${this._onClickUpdate}><b>UPDATE</b></button>
      </p>
    `;
  }

  _onClickUpdate(event) {
    navigator.geolocation.getCurrentPosition(this._onGeoSuccess.bind(this), this._onGeoError);
  }

  _onGeoSuccess(position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.alt = position.coords.altitude || 'N/A';
    this.timeGeo = new Date().toLocaleString('ro');
    this._fetchAddress();
  }

  _onGeoError() {
    alert('Unable to retrieve current location');
  }

  async _fetchAddress() {
    const base = 'https://nominatim.openstreetmap.org/reverse';
    const result = await fetch(`${base}?lat=${this.lat}&lon=${this.lon}&format=json`);
    const data = await result.json();
    this.adr = data.display_name;
    this.timeAdr = new Date().toLocaleString('ro');
  }
}

window.customElements.define('ia-location', IaLocation);
