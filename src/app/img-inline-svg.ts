export class ImgInlineSvg extends HTMLElement {

  // private _root: ShadowRoot; // used when attachShadow mode is "closed" in order to be able to access the shadowRoot from js, for instance the lifecycle callbacks (_color())

  constructor() {
    // Always call super first in constructor
    super();

    // this._root = this.attachShadow({ mode: "closed" });     
    const shadowRoot = this.attachShadow({ mode: "open" });
    const imgSrc = this.getAttribute("src");
    
    fetch(imgSrc)
      .then(response => response.text())
      .then(text => {
        const mySvg = text;
        // this._root.innerHTML = `
        shadowRoot.innerHTML = `
        <style>
        :host {
            display: inline-block;
        }
        svg {
            width: 100%;
            height: 100%;
        }
        </style>        
        ${mySvg}
        `;

        this._color();
      });   
  }

  _color() {
    const fillColor = getComputedStyle(this).color || "white";
    const svg = this.shadowRoot.querySelector("svg");
    // const svg = this._root.querySelector("svg");
    if (svg) {
      svg.style.fill = fillColor;
    }
  }

  // called after the web component has been attached in the DOM
  // lifecycle callback, invoked each time the custom element is appended into a document-connected element
  // connectedCallback may be called once your element is no longer connected, use Node.isConnected to make sure
  connectedCallback() {
    console.log('Element img-inline-svg connected.');
    if(this.isConnected)
    this._color();
  }

  // lifecycle callback, invoked each time the custom element is disconnected from the document's DOM
  disconnectedCallback() {
    console.log('Element img-inline-svg removed from page.');
  }

  // lifecycle callback, invoked when one of the custom element's attributes is added, removed, or changed
  // which attributes to notice change for is specified in a static get observedAttributes method
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "style") {
      this._color();
    }
  }

static get observedAttributes() {
  return ["src", "style"];
}

}

// custom element names require a dash to be used in them (kebab-case); they can't be single words
customElements.define("img-inline-svg", ImgInlineSvg);
