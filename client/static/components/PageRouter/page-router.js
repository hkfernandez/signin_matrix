import html from "./page-router.html";
import css from "./page-router.css";
import { pages } from "../../js/dependencies/pages.js";
//import { validateUser } from "../../js/dependencies/firebaseaAuth.js";

export class PageRouter extends HTMLElement {
  #currentPageInfo;
  #defaultPageInfo = pages.about;
  constructor() {
    super();
  }
  //when the component loads
  connectedCallback() {
    this.innerHTML = html;
    this.#currentPageInfo = this.getCurrentPageInfoFromUrl();
    this.renderPage();

    window.addEventListener("click", (event) =>
      this.renderPageLinkOnClick(event)
    );
    window.addEventListener("click", (event) => this.manageBackBtnUse(event));
  }

  manageBackBtnUse(event) {
    if (!event.state) return;
    this.#currentPageInfo = event.state;
    this.renderPage();
  }

  getCurrentPageInfoFromUrl() {
    for (const current in pages) {
      if (pages[current].path === window.location.pathname) {
        return pages[current];
      }
    }
    return this.#defaultPageInfo;
  }
  renderPage() {
    //remove the previous page
    console.log("rendering");
    const pageId = "currentPage";
    const prevPage = document.getElementById(pageId);
    if (prevPage != null) {
      prevPage.remove();
    }
    //const user = validateUser();
    const newPage = document.createElement(this.#currentPageInfo.component);
    newPage.id = pageId;
    //TODO
    //newPage.addEventListener("ChangePage", (event) =>
    //  this.#gotoNewPage(event.detail)
    //);
    this.appendChild(newPage);
    document.title = this.#currentPageInfo.title;
    history.pushState(
      this.#currentPageInfo,
      this.#currentPageInfo,
      window.location.origin + this.#currentPageInfo.path
    );
  }
  renderPageLinkOnClick(event) {
    //composed path helps when clicking on a web component
    //returns an array of the nodes crossed - innermost node first
    //event.preventDefault();
    const linkPath = event.composedPath()[0].dataset.path;
    if (linkPath) {
      console.log("renderingPageOnClickEvent");
      console.log(event.target);
      console.log(linkPath);
      for (const current in pages) {
        if (pages[current].path === linkPath) {
          this.#currentPageInfo = pages[current];
        }
      }
      this.renderPage();
    }
  }
}
