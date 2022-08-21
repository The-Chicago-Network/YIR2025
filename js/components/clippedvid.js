 const template = document.createElement('template');

template.innerHTML = `
  <style>
    .clipVidContainer {
          position: absolute;
          top: 0;
          left: 0;
          padding-top: 36vh;

          }

          @media screen and (max-width: 1000px) {
              .clipVidContainer {
                      padding-top: 20vh
          }
      }
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
      clip-path: /*url("#cliptext");*/url("data:image/svg+xml,%3Csvg%3E%3CclipPath%20id%3D%22cliptext%22%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22-75%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22Literata%22%20font-weight%3D%22bold%22%20font-size%3D%2240vw%22%20%3E%202022%3C%2Ftext%3E%3C%2FclipPath%3E%3C%2Fsvg%3E");
    }
  </style>

    <div class="clipVidContainer"><!--
        <div class="clipSVG">
          <svg>
            <clipPath id="cliptext">
              <text x="50%" y="-75%" text-anchor="middle" dominant-baseline="middle" font-family="Literata" font-weight="bold" font-size="500" >
                2022
              </text>
            </clipPath>
          </svg>
        </div> -->
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
   //this.$clippedVid.querySelector(`text`).setAttribute('font-size', this.fontsize);
   //this.$clippedVid.querySelector(`text`).innerHTML = `${this.cliptext}`;
  }
}

// Define custom element
window.customElements.define('clip-vid', clippedVid);
