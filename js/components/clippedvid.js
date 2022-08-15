 const template = document.createElement('template');

template.innerHTML = `
  <style>
    #background-video {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
    }

    .overlay {
        background-image: url("./images/StripePattern.webp");
        background-repeat: repeat;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .clipSVG {
      width: 100vw;
    }
    svg {
      width: 100vw;
      height: 100vh;
    }
    .vidGroup {
      clip-path: url("#cliptext");
    }
  </style>

    <div class="clipVidContainer">
        <div class="clipSVG">
          <svg>
            <clipPath id="cliptext">
              <text x="50%" y="-75%" text-anchor="middle" dominant-baseline="middle" font-family="Literata" font-weight="bold" font-size="500" >
                2022
              </text>
            </clipPath>
          </svg>
        </div>
        <div class="vidGroup">
            <div class="overlay"></div>
            <video id="background-video" autoplay loop muted poster="./images/vidposter.webp">
                <source src="./video.webm" type="video/mp4">
            </video>
        </div>
    </div>
`;

class clippedVid extends HTMLElement {
  constructor() {
    super();

    // Set up shadow root to isolate instance
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$clippedVid = this._shadowRoot.querySelector('.clipVidContainer');
  }

  // Get attributes passed through HTML
  static get observedAttributes() {
    return ['vidurl','posterurl','overlayurl','cliptext','fontsize','windowsize'];
  }

  // Re-render on change
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      //console.log(`set ${oldVal} to ${newVal}.`)
      this[name] = newVal;
      this.render();
    }
  }



  // Insert attribute values from HTML in render
  render() {
   this.$clippedVid.querySelector('source').src = this.vidurl;
   this.$clippedVid.querySelector('#background-video').poster = this.posterurl;
   this.$clippedVid.querySelector('.overlay').style.backgroundImage = `url(${this.overlayurl})`;
   this.$clippedVid.querySelector(`text`).setAttribute('font-size', this.fontsize);
   this.$clippedVid.querySelector(`text`).innerHTML = `${this.cliptext}`;
  }
}

// Define custom element
window.customElements.define('clip-vid', clippedVid);
