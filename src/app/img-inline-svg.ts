class ImgInlineSvg extends HTMLElement {
  private fillColor: string;

  set color(c: string) {
    const svg = this.shadowRoot.querySelector("svg");
    if (svg) {
      svg.style.fill = c;
    }
  }

  constructor() {
    console.log("constr");
    super();
    const imgSrc = this.getAttribute("src");
    this.fillColor = this.getAttribute("color") || "white";
    const shadow = this.attachShadow({ mode: "open" });
    fetch(imgSrc)
      .then(response => response.text())
      .then(text => {
        const mySvg = text;
        shadow.innerHTML = `
        <style>
        :host {
            display: block;
        }
        svg {
            fill: ${this.fillColor};
            width: 100%;
            height: 100%;
        }
        </style>        
        ${mySvg}
        `;
      });
  }

  connectedCallback() {
    console.log("Connected.");
  }

  static get observedAttributes() {
    return ["src", "color", "style"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("Attributes changed.", name, oldValue, newValue);
    if (name === "color") {
      this.color = newValue;
    }
    if (name === "style") {
      this.color = getComputedStyle(this).fill;
      // this.color=this.style.fill;
    }
  }
}
customElements.define("img-inline-svg", ImgInlineSvg);
