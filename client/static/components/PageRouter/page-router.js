import html from "./page-router.html";
import css from "./page-router.css";
import { pages } from "../../js/dependencies/pages.js";

import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { setUpShadow } = helperFunctions;

export class PageRouter extends HTMLElement {
  #currentPage;
  #defaultPage = pages.about;
  constructor() {
    super();
    //setUpShadow(this, html, css);
  }
  //when the component load render the page in url path
  connectedCallback() {
    this.innerHTML = html;
    this.#currentPage = this.getCurrentPageFromUrl();
    this.renderPage();
  }
  getCurrentPageFromUrl() {
    for (const current in pages) {
      if (pages[current].path === window.location.pathname) {
        return pages[current];
      }
    }
    return this.#defaultPage;
  }
  renderPage() {
    //remove the previous page
    const pageId = "currentPage";
    const prevPage = document.getElementById(pageId);
    if (prevPage) {
      this.removeChild(prevPage);
    }

    const newPage = document.createElement(this.#currentPage.component);
    //TODO
    //newPage.addEventListener("ChangePage", (event) =>
    //  this.#gotoNewPage(event.detail)
    //);
    this.appendChild(newPage);
  }
}
