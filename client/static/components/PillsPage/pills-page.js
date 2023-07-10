import html from "./pills-page.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass } = helperFunctions;
import { rain } from "../../js/dependencies/digitalRain.js";

export class PillsPage extends HTMLElement {
  #RED_PILL_STATE = "closed";
  #BLUE_PILL_STATE = "closed";
  #elements = () => {
    return {
      signUpInMessage: document.getElementById("signUpInMessage"),
      bluePillWrapper: document.getElementById("bluePillWrapper"),
      redPillWrapper: document.getElementById("redPillWrapper"),
      signUpInBtn: document.getElementById("signUpInBtn"),
      signUpInForm: document.getElementById("signUpInForm"),
      fullPageOverlay: document.getElementById("fullPageOverlay"),
    };
  };
  #animations = {
    //secondary functions called by other animation functions
    secondary: {
      openClosePill: (pill, action) => {
        const { pillColor, leftPill, rightPill } = pill;
        let oppositeAction = "open";
        if (action === "open") {
          oppositeAction = "close";
        }
        addRemoveClass(
          leftPill,
          `left-pill-${action}-${pillColor}`,
          `left-pill-${oppositeAction}-${pillColor}`
        );
        addRemoveClass(
          rightPill,
          `right-pill-${action}-${pillColor}`,
          `right-pill-${oppositeAction}-${pillColor}`
        );
      },
      parsePill: (pill) => {
        const pillColor = pill.dataset.color;
        let leftPill = null;
        let rightPill = null;
        if (pill.dataset.side === "left") {
          leftPill = pill;
          rightPill = leftPill.nextElementSibling;
        } else {
          rightPill = pill;
          leftPill = pill.previousElementSibling;
        }
        return { pillColor, leftPill, rightPill };
      },
      transitionToQuotesPage: () => {
        console.log("transitioning to quotes page");
        const { fullPageOverlay } = this.#elements();
        addRemoveClass(fullPageOverlay, "fade-overlay-in", "hidden");
        rain();
        //setTimeout(() => {
        //  fullPageOverlay().classList.add("fade-overlay-to-green");
        //}, 3000);
        //TODO
        setTimeout(() => (window.location.pathname = "/quotes"), 13000);
      },
      validatePillState: (leftPill) => {
        if (
          this.#RED_PILL_STATE === "open" &&
          leftPill.classList.contains("red") &&
          !leftPill.classList.contains("left-pill-open-red")
        ) {
          this.#RED_PILL_STATE = "closed";
        }
        if (
          this.#BLUE_PILL_STATE === "open" &&
          leftPill.classList.contains("blue") &&
          !leftPill.classList.contains("left-pill-open-blue")
        ) {
          this.#RED_PILL_STATE = "closed";
        }
      },
    },
    signInAndContinue: async () => {
      const { signUpInForm } = this.#elements();
      const user = await signUpInForm.signIn();
      console.log("userInfo: ", user);
      if (user.uid) {
        this.#animations.secondary.transitionToQuotesPage();
      }
    },
    switchToSignIn: () => {
      const { signUpInForm } = this.#elements();
      signUpInForm.animations.switchToSignIn();
    },
    togglePillOpenClose: (pill) => {
      const { signUpInMessage, bluePillWrapper, redPillWrapper, signUpInForm } =
        this.#elements();
      const { openClosePill, parsePill, validatePillState } =
        this.#animations.secondary;
      const parsedPill = parsePill(pill);
      const { pillColor, leftPill, rightPill } = parsedPill;

      validatePillState(leftPill);

      if (pillColor === "red") {
        //CLICKING ON RED PILL
        if (this.#RED_PILL_STATE === "closed") {
          rightPill.classList.remove("text-hidden");
          openClosePill(parsedPill, "open");
          addRemoveClass(
            redPillWrapper,
            "scroll-red-pill-down",
            "scroll-red-pill-up"
          );
          addRemoveClass(bluePillWrapper, "fade-pill-out", "fade-pill-in");
          addRemoveClass(
            signUpInMessage,
            "scroll-sign-in-message-in",
            "scroll-sign-in-message-out"
          );
          signUpInForm.animations.switchToSignUp(this.#RED_PILL_STATE);
          this.#RED_PILL_STATE = "open";
        } else {
          openClosePill(parsedPill, "close");
          addRemoveClass(
            redPillWrapper,
            "scroll-red-pill-up",
            "scroll-red-pill-down"
          );
          setTimeout(
            () =>
              addRemoveClass(bluePillWrapper, "fade-pill-in", "fade-pill-out"),
            2000
          );
          addRemoveClass(
            signUpInMessage,
            "scroll-sign-in-message-out",
            "scroll-sign-in-message-in"
          );
          signUpInForm().animations.scrollSignUpInBtnToClosePosition();
          //this.#animations.secondary.scrollSignUpInBtnToClosePosition();
          this.#RED_PILL_STATE = "closed";
        }
      } else {
        //CLICKING ON BLUE PILL
        if (this.#BLUE_PILL_STATE === "closed") {
          leftPill.classList.remove("text-hidden");
          openClosePill(parsedPill, "open");
          addRemoveClass(
            bluePillWrapper,
            "scroll-blue-pill-up",
            "scroll-blue-pill-down"
          );
          addRemoveClass(redPillWrapper, "fade-pill-out", "fade-pill-in");
          this.#BLUE_PILL_STATE = "open";
        } else {
          setTimeout(
            () =>
              addRemoveClass(redPillWrapper, "fade-pill-in", "fade-pill-out"),
            3000
          );
          openClosePill(parsedPill, "close");
          addRemoveClass(
            bluePillWrapper,
            "scroll-blue-pill-down",
            "scroll-blue-pill-up"
          );
          this.#BLUE_PILL_STATE = "closed";
        }
      }
    },
  };

  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
    document.addEventListener("click", (event) =>
      this.#handleClickEventAnimations(event)
    );
  }
  #handleClickEventAnimations(event) {
    event.preventDefault();
    const target = event.composedPath()[0];
    const animation = target.dataset.animation;
    if (!animation) return;
    console.log("animation name: ", animation);
    if (this.#animations[animation] === undefined) return;
    this.#animations[animation](target);
  }
}
