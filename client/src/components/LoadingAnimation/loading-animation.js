import html from "./loading-animation.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass, randomIntFromInterval } = helperFunctions;

export class LoadingAnimation extends HTMLElement {
  #animatingInterval = null;
  characterList = "01";
  #ANIMATION_SPEED = 20;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;
    const animation = document.getElementById("loadingAnimationText");
    animation.textContent = "01010101";
  }

  start() {
    const loadingAnimationText = document.getElementById(
      "loadingAnimationText"
    );
    loadingAnimationText.textContent = "01010101";
    addRemoveClass(
      this,
      "scroll-loading-animation-in",
      "scroll-loading-animation-out"
    );
    function changeCharacter() {
      let randomLoadingAnimationTextContentIndex = randomIntFromInterval(
        0,
        loadingAnimationText.textContent.length - 1
      );

      let characterArray = loadingAnimationText.textContent.split("");
      characterArray.splice(
        randomLoadingAnimationTextContentIndex,
        1,
        loadingAnimationText.textContent[
          randomLoadingAnimationTextContentIndex
        ] === "0"
          ? "1"
          : "0"
      );
      loadingAnimationText.textContent = characterArray.join("");
    }
    this.#animatingInterval = setInterval(
      changeCharacter,
      this.#ANIMATION_SPEED
    );
  }
  stop() {
    const loadingAnimationText = document.getElementById(
      "loadingAnimationText"
    );
    clearInterval(this.#animatingInterval);
    addRemoveClass(
      this,
      "scroll-loading-animation-out",
      "scroll-loading-animation-in"
    );
    //setTimeout(() => (loadingAnimationText.textContent = ""), 1000);
  }
}
