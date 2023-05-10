const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/static/css/header.css" />
  <header id="headerComponent">
    <div id="tileAndLinksWrapper">
      <div id="headerWrapper">
        <h1>Favorites</h1>
        <h2>a tech stack portfolio</h2>
      </div>
      <nav>
        <ul>
          <li><button id="authBtn">Auth</button><li>
          <li><button id="dockerBtn">Docker</button><li>
        </ul>
      </nav>
    </div>
  </header>
`;
class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot
      .getElementById("authBtn")
      .addEventListener("click", () => this.fetchPillsPage());
  }
}
customElements.define("header-component", Header);
