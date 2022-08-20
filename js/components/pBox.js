 const template = document.createElement('template');

template.innerHTML = `
  <style>
    .pbox {
      display: flex;
      flex-flow: column nowrap;
      max-width: 20vw;
      min-width: 8rem;
    }
    .imageBox {
      width: 6rem;
    }
    p {
      font-family: var(--pFontFamily);
      font-weight: var(--pFontWeight);
      font-size: var(--pFontSize);
      line-height: var(--pLineHeight);
    }
    @media all and (max-width: 1000px) {
        p {
          font-family: var(--pFontFamily);
          font-weight: var(--pFontWeight);
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }
  </style>

  <div class="pbox">
    <div class="imageBox"></div><p></p>
  </div>
`;

class pboxContainer extends HTMLElement {
  constructor() {
    super();

    // Set up shadow root to isolate instance
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$pbox = this._shadowRoot.querySelector('.pbox');
  }

  // Get attributes passed through HTML
  static get observedAttributes() {
    return ['image','alttext','text'];
  }

  // Re-render on change
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      this[name] = newVal;
      this.render();
    }
  }

  // Insert attribute values from HTML in render
  render() {
   this.text ? this.$pbox.querySelector('p').innerHTML = this.text : null;
   this.image ? this.$pbox.querySelector('.imageBox').innerHTML = `<img src="${this.image}" alt="${this.alttext}">` : null;
  }
}

// Define custom element
window.customElements.define('p-box', pboxContainer);
