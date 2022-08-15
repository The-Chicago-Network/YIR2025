 const template = document.createElement('template');

template.innerHTML = `
  <style>
  .event {
      margin: 0 3rem 10rem 3rem;
      width: 12rem;
    }
    .eventHex {
        width: 13rem;
        height: 13rem;
        max-width: 13rem;
        max-height: 13rem;
        margin-bottom: -9rem;
        margin-left: -3rem;
        position: relative;
        z-index: 0;
        clip-path: polygon(50% 0, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%);
    }
    .h4Container {
        position: relative;
    }
    h4 {
      font-family: 'var(--hhFontFamily)';
      font-size: 1.5rem;
    }
  </style>

    <div class="event">
        <div class="eventHex"></div>
        <div class="h4Container">
            <h4><em></em></h4>
        </div>
    </div>
`;

class Event extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$event = this._shadowRoot.querySelector('.event');
  }

  static get observedAttributes() {
    return ['title','color'];
  }

    attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      this[name] = newVal;
      this.render();
    }
  }

  render() {
   this.$event.querySelector('h4 em').innerHTML = this.title;
   this.$event.querySelector('.eventHex').style.background = this.color;
  }
}

// Define custom element
window.customElements.define('tcn-event', Event);
