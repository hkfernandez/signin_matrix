const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/static/css/components/quote.css" />
  <div class="quote-text"></div>  
  <div class="quote-author"></div> 
`;
export class QuoteLi extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
  }
  connectedCallback() {}
}
customElements.define("quote-component", QuoteLi);
