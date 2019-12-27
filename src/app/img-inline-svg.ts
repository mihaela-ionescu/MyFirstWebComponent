class ImgInlineSvg extends HTMLElement {
  constructor() {
    super();
    const imgSrc = this.getAttribute("src");
    const shadow = this.attachShadow({ mode: "open" });
    fetch(imgSrc)
      .then(response => response.text())
      .then(text => {
        const mySvg = text;
        shadow.innerHTML = `
        <style> svg {
            fill: red;
        }
        </style>        
        ${mySvg}
        `;
    });
  }
}
customElements.define("img-inline-svg", ImgInlineSvg);
