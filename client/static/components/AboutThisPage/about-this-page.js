import html from "./about-this-page.html";

export class AboutThisPage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
  }
}
