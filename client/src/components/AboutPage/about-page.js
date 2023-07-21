import html from "./about-page.html";

export class AboutPage extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
  }
}
