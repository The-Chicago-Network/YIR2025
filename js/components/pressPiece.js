const template = document.createElement("template");

template.innerHTML = `
 <style>
	a {
		height: 100%;
		text-decoration: none;

	}
	.copyContainer {
		justify-content: space-between;
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
	}
	.pressItem {
		height: 15rem;
		max-height: 15rem;
		width: 15rem;
	}
	.publicationDetails {
		color: white;
		display: flex;
		flex-flow: row nowrap;
		font-size: .8rem;
		justify-content: space-between;
		margin: 0;
		padding: 0rem 1rem 1rem 1rem;
	}
	.publicationDetails p {
		font-size: .75rem;
		margin: 0;
	}
	.title > h4 {
		color: white;
		font-size: 1.25rem;
		margin: 0;
		padding: 1rem 1rem 0 1rem;
	}
 </style>

 <div class="pressItem" part="main">
	<a href="">
		<div class="copyContainer" part="copy">
			<div class="title" part="title">
				<h4></h4>
			</div>
			<div class="publicationDetails">
				<div class="publicationName">
					<p part="name"></p>
				</div>
				<div class="publicationDate">
					<p part="date"></p>
				</div>
			</div>
		</div>
	</a>
 </div>
 `;

class PressPiece extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$item = this._shadowRoot.querySelector(".pressItem");
    this.truncate = (str) => {
      return str.length > 120 ? str.slice(0, 120) + "…" : str;
    };
  }

  static get observedAttributes() {
    return ["title", "url", "publication", "date"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      this[name] = newVal;
      this.render();
    }
  }

  render() {
    this.$item.querySelector("div.title > h4").innerHTML = this.truncate(
      this.title,
    );
    this.$item.querySelector("a").href = this.url;
    this.$item.querySelector("div.publicationName > p").innerHTML =
      this.publication;
    this.$item.querySelector("div.publicationDate > p").innerHTML = this.date;
  }
}

// Define custom element
window.customElements.define("tcn-press", PressPiece);
