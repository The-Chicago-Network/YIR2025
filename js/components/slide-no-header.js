 const template = document.createElement('template');

template.innerHTML = `
  <style>
    .slideContainer {
      background-color: var(--slideImageBG);
      width: 100vw;
      height: 100vh;
      /* padding: 5rem;*/
      background-size: cover;
    }
  </style>

   <div class="slideContainer">
    <div class="innerSlide">
    </div>
    <slot></slot>
  </div>
`;

class SlideNoHeader extends HTMLElement {
  constructor() {
    super();

    // Set up shadow root to isolate instance
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$slide = this._shadowRoot.querySelector('.slideContainer');
  }

  // Get attributes passed through HTML
  static get observedAttributes() {
    return ['title','image','altText','background'];
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
   this.title ? this.$slide.querySelector('.innerSlide h2').innerHTML = this.title : null;
   this.background ? this.$slide.style.background = this.background : null;
   this.image ? this.$slide.style.background = `url("${this.image}") no-repeat top center` : null;
   this.image ? this.$slide.style.backgroundSize = `cover` : null;
  }
}

// Define custom element
window.customElements.define('slide-no-header', SlideNoHeader);
