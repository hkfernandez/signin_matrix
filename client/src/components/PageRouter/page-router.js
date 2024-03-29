import html from "./page-router.html";
import { pages } from "../../js/dependencies/pages.js";

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
      this.handleNavigationOnClick(event)
    );
    window.addEventListener("popstate", (event) =>
      this.manageBackBtnUse(event)
    );
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
  renderPage(page) {
    //allows calling of the function for programatic navigation
    if (page) {
      this.#currentPageInfo = pages[page];
    }
    const pageId = "currentPage";
    const prevPage = document.getElementById(pageId);
    if (prevPage != null) {
      prevPage.remove();
    }
    document.title = this.#currentPageInfo.title;
    //puts the path in the URL
    history.pushState(
      this.#currentPageInfo,
      this.#currentPageInfo,
      window.location.origin + this.#currentPageInfo.path
    );
    const newPage = document.createElement(this.#currentPageInfo.component);
    newPage.id = pageId;
    //TODO
    //newPage.addEventListener("ChangePage", (event) =>
    //  this.#gotoNewPage(event.detail)
    //);
    this.appendChild(newPage);
  }
  handleNavigationOnClick(event) {
    //composed path helps when clicking on a web component
    //returns an array of the nodes crossed - innermost node first
    //event.preventDefault();
    const linkPath = event.composedPath()[0].dataset.path;
    if (linkPath) {
      for (const current in pages) {
        if (pages[current].path === linkPath) {
          this.#currentPageInfo = pages[current];
        }
      }
      this.renderPage();
    }
  }
}
