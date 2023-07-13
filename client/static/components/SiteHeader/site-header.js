import { signOutUser } from "../../js/dependencies/firebaseFrontedServices.js";
import html from "./site-header.html";

export class SiteHeader extends HTMLElement {
  #elements = () => {
    return {
      signOutBtn: document.getElementById("signOutBtn"),
    };
  };

  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
    const { signOutBtn } = this.#elements();
    signOutBtn.addEventListener("click", () => signOutUser());
  }
}
