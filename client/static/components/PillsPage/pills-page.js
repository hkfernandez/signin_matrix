import html from "./pills-page.html";

export class PillsPage extends HTMLElement {
  constructor() {
    super();
    //const shadow = this.attachShadow({ mode: "open" });
    //shadow.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.innerHTML = html;
  }
}
