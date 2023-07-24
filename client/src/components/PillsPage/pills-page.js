import html from "./pills-page.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass } = helperFunctions;
import { rain } from "../../js/dependencies/digitalRain.js";
import { PageRouter } from "../PageRouter/page-router.js";

export class PillsPage extends HTMLElement {
  #RED_PILL_STATE = "closed";
  #BLUE_PILL_STATE = "closed";
  #ANIMATING = false;
  #elements = () => {
    return {
      bluePillWrapper: document.getElementById("bluePillWrapper"),
      continueWithoutSigningInBtn: document.getElementById(
        "continueWithoutSigningInBtn"
      ),
      fullPageOverlay: document.getElementById("fullPageOverlay"),
      pageRouter: document.getElementById("pageRouter"),
      redPillWrapper: document.getElementById("redPillWrapper"),
      signUpInBtn: document.getElementById("signUpInBtn"),
      signUpInForm: document.getElementById("signUpInForm"),
      signUpInMessage: document.getElementById("signUpInMessage"),
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
      if (user.uid) {
        this.#animations.secondary.transitionToQuotesPage();
      }
    },
    signUpAndContinue: async () => {
      const { signUpInForm } = this.#elements();
      const returnValue = await signUpInForm.signUp();
      if (returnValue) {
        this.#animations.secondary.transitionToQuotesPage();
      }
    },
    //switchToSignIn: () => {
    //  const { signUpInForm } = this.#elements();
    //  signUpInForm.animations.switchToSignIn();
    //},
    togglePillOpenClose: (event) => {
      if (this.#ANIMATING) return;
      this.#ANIMATING = true;
      const pill = event.composedPath()[0];
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
          setTimeout(() => (this.#ANIMATING = false), 5000);
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
          signUpInForm.animations.scrollSignUpInBtnToClosePosition();
          //this.#animations.secondary.scrollSignUpInBtnToClosePosition();
          this.#RED_PILL_STATE = "closed";
          setTimeout(() => (this.#ANIMATING = false), 4000);
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
          setTimeout(() => (this.#ANIMATING = false), 5000);
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
          setTimeout(() => (this.#ANIMATING = false), 4000);
        }
      }
    },
  };

  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
    const { continueWithoutSigningInBtn, pageRouter } = this.#elements();
    continueWithoutSigningInBtn.addEventListener("click", () =>
      pageRouter.renderPage("quotes")
    );
    const pillElements = Array.from(document.getElementsByClassName("pill"));
    pillElements.forEach((element) =>
      element.addEventListener("click", (event) =>
        this.#animations.togglePillOpenClose(event)
      )
    );
  }
}
