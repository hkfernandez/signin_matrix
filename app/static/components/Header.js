const template = `
  <header>
    <div id="tileAndLinksWrapper">
      <button id='backToAboutBtn' data-path="/about" class="btn-text-with-border">
        <p data-path="/about">Favorites</p>
        <span data-path="/about">a tech stack portfolio</span>
      </button>
      <nav>
        <ul>
          <li><button data-path="/pills" class="btn-text btn-header">Auth</button><li>
          <li><button id="dockerBtn" class="btn-text btn-header">Docker</button><li>
        </ul>
      </nav>
    </div>
  </header>
`;
class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template;
  }
}
customElements.define("header-component", Header);
