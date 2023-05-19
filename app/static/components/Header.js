const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="/static/css/header.css" />
  <header id="headerComponent">
    <div id="tileAndLinksWrapper">
      <div id="siteNameWrapper">
        <button>
          <h1 data-path="/about">Favorites</h1>
        </button>
        <h2>a tech stack portfolio</h2>
      </div>
      <nav>
        <ul>
          <li><button data-path="/pills">Auth</button><li>
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
    //this.shadowRoot
    //  .getElementById("authBtn")
    //  .addEventListener("click", () => this.fetchPillsPage());
  }
}
customElements.define("header-component", Header);
