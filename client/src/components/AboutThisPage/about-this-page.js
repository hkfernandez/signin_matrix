import html from "./about-this-page.html";
import { text } from "../../js/dependencies/aboutThisPageText.js";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass } = helperFunctions;

export class AboutThisPage extends HTMLElement {
  #elements = () => {
    return {
      aboutThisPage: document.getElementById("aboutThisPage"),
      aboutThisPageText: document.getElementById("aboutThisPageText"),
      aboutThisPageTitle: document.getElementById("aboutThisPageTitle"),
      aboutThisPageTitleBtn: document.getElementById("aboutThisPageTitleBtn"),
      closeAboutThisPageBtn: document.getElementById("closeAboutThisPageBtn"),
    };
  };
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;

    const { aboutThisPageTitleBtn, closeAboutThisPageBtn } = this.#elements();
    aboutThisPageTitleBtn.addEventListener("click", () => {
      this.#expandAboutThisPage();
    });
    closeAboutThisPageBtn.addEventListener("click", () => {
      this.#closeAboutThisPage();
    });
  }

  #expandAboutThisPage() {
    const {
      aboutThisPage,
      aboutThisPageTitle,
      aboutThisPageText,
      closeAboutThisPageBtn,
    } = this.#elements();
    addRemoveClass(
      aboutThisPage,
      "expand-about-this-page",
      "collapse-about-this-page"
    );
    addRemoveClass(
      aboutThisPageTitle,
      "expand-about-this-page-title",
      "shrink-about-this-page-title"
    );
    this.#updateAboutThisPageText();
    aboutThisPageText.style.display = "block";
    closeAboutThisPageBtn.style.display = "block";
  }
  #closeAboutThisPage() {
    const {
      aboutThisPage,
      aboutThisPageTitle,
      aboutThisPageText,
      closeAboutThisPageBtn,
    } = this.#elements();
    addRemoveClass(
      aboutThisPage,
      "collapse-about-this-page",
      "expand-about-this-page"
    );
    addRemoveClass(
      aboutThisPageTitle,
      "shrink-about-this-page-title",
      "expand-about-this-page-title"
    );
    aboutThisPageText.style.display = "none";
    closeAboutThisPageBtn.style.display = "none";
  }
  #updateAboutThisPageText() {
    const { aboutThisPageText } = this.#elements();
    const pageName = window.location.pathname.slice(1);
    aboutThisPageText.textContent = text[pageName];
  }
}
