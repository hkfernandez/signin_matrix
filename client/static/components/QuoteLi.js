const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/static/css/components/quote.css" />
  <style>
    .quote-text{
      text-align: center;
      font-weight: 600;
      font-style: italic;
       margin-bottom: 0.5em;
    }
    .quote-author{
      text-align: center;
    }
  </style>
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
