const template = `
  <header>
    <div id="tileAndLinksWrapper">
      <button id='navigateToAboutBtn' data-path="/about" class="btn-text-with-border">
        <p data-path="/about">Favorites<img id="favoritesIcon" src="/static/images/star_in_circle_32x32.png"></p>
        <span data-path="/about">a tech stack portfolio</span>
      </button>
      <nav>
        <ul>
          <li><button data-path="/pills" class="btn-text btn-site-header">Auth</button><li>
          <li><button id="dockerBtn" class="btn-text btn-site-header">Docker</button><li>
          <li><button id="signOutBtn" class="btn-text btn-site-header">Signout</button><li>
          <li><button id="checkAuthBtn" class="btn-text btn-site-header">Check</button><li>
        </ul>
      </nav>
    </div>
  </header>
`;
export class SiteHeader extends HTMLElement {
  constructor() {
    super();
    console.log("SIGNOUT", this.signOut);
  }
  connectedCallback() {
    this.innerHTML = template;
    this.querySelector("#signOutBtn").addEventListener("click", () =>
      this.signOut()
    );
  }
}
