 const template = document.createElement('template');

template.innerHTML = `
  <style>
    .card {
      background-color: white;
      color: black;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,.2);
      border-radius: 5px;
      padding: 1rem;
      min-width: 10rem;
      min-height: 10rem;
      max-width: 80vw;
    }
  </style>

  <div class="card">
    <slot></slot>
  </div>
`;

class Card extends HTMLElement {
  constructor() {
    super();

    // Set up shadow root to isolate instance
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$card = this._shadowRoot.querySelector('.card');
  }

  // Get attributes passed through HTML
  static get observedAttributes() {
    return ['extraclass'];
  }

  // Re-render on change
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      console.log(`${name} has been changed from ${oldVal} to ${newVal}.`)
      this[name] = newVal;
      this.render();
    }
  }

  // Insert attribute values from HTML in render
  render() {
      this.extraclass ? this.$slide.querySelector('.card').appendClass = this.extraclass : null;
  }
}

// Define custom element
window.customElements.define('basic-card', Card);
