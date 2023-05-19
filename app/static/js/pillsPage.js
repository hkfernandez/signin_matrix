//MODULES
import { signInUser, signUpUser } from "./dependencies/signup.js";
import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
import { rain } from "/static/js/dependencies/digitalRain.js";

//IMPORTED FUNCTIONS
const { addRemoveClass } = helperFunctions;

//LISTENERS
document.addEventListener("click", delegateClickEvents);
function delegateClickEvents(event) {
  const target = event.composedPath()[0];
  const animation = target.dataset.animation;
  if (!animation) return;
  animations[animation](target);
}

//ELEMENTS
const elements = {
  signUpInMessage: document.getElementById("signUpInMessage"),
  bluePillWrapper: document.getElementById("bluePillWrapper"),
  redPillWrapper: document.getElementById("redPillWrapper"),
  signUpInMessageSpan: document.getElementById("signUpInMessageSpan"),
  signUpInBtn: document.getElementById("signUpInBtn"),
  btnAnimationWrapper: document.getElementById("btnAnimationWrapper"),
  toggleSignUpInFormBtn: document.getElementById("toggleSignUpInFormBtn"),
  fullPageOverlay: document.getElementById("fullPageOverlay"),
};

//VARIABLES
let RED_PILL_STATE = "closed";
let BLUE_PILL_STATE = "closed";
document.onload = () => {
  RED_PILL_STATE = "closed";
  BLUE_PILL_STATE = "closed";
};
console.log("redPillState", RED_PILL_STATE);
console.log("bluePillState", BLUE_PILL_STATE);

const animations = {
  togglePillOpenClose: (pill) => {
    const { signUpInMessage, bluePillWrapper, redPillWrapper } = elements;
    console.log("bluePillWrapper at first", bluePillWrapper);
    console.log("redPillState", RED_PILL_STATE);

    function animatePill(color, leftPill, rightPill) {
      function openClosePill(pillColor, action) {
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
      }

      if (color === "red") {
        //CLICKING ON RED PILL
        if (RED_PILL_STATE === "closed") {
          rightPill.classList.remove("text-hidden");
          openClosePill("red", "open");
          console.log("bluePillWrapper before", bluePillWrapper);
          addRemoveClass(
            bluePillWrapper,
            "fade-element-out",
            "fade-element-in"
          );
          console.log("bluePillWrapper after", bluePillWrapper);
          addRemoveClass(
            signUpInMessage,
            "scroll-sign-in-message-in",
            "scroll-sign-in-message-out"
          );
          animations.switchToSignUp();
          RED_PILL_STATE = "open";
        } else {
          openClosePill("red", "close");
          addRemoveClass(
            bluePillWrapper,
            "fade-element-in",
            "fade-element-out"
          );
          addRemoveClass(
            signUpInMessage,
            "scroll-sign-in-message-out",
            "scroll-sign-in-message-in"
          );
          animations.switchToSignIn();
          RED_PILL_STATE = "closed";
        }
      } else {
        //CLICKING ON BLUE PILL
        if (BLUE_PILL_STATE === "closed") {
          leftPill.classList.remove("text-hidden");
          openClosePill("blue", "open");
          addRemoveClass(redPillWrapper, "fade-element-out", "fade-element-in");
          BLUE_PILL_STATE = "open";
        } else {
          addRemoveClass(redPillWrapper, "fade-element-in", "fade-element-out");
          openClosePill("blue", "close");
          BLUE_PILL_STATE = "closed";
        }
      }
    }

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

    animatePill(pillColor, leftPill, rightPill);
  },
  switchToSignIn: () => {
    const {
      signUpInMessageSpan,
      signUpInBtn,
      btnAnimationWrapper,
      toggleSignUpInFormBtn,
    } = elements;

    signUpInMessageSpan.textContent = "If you need to create an account click ";
    signUpInBtn.innerHTML = "RE-ENTER";
    addRemoveClass(
      btnAnimationWrapper,
      "scoll-sign-up-btn-to-cover-input",
      "scroll-sign-up-btn-in-with-delay"
    );
    btnAnimationWrapper.classList.remove("scroll-sign-up-btn-in-no-delay");
    signUpInBtn.dataset.animation = "signInAndContinue";
    toggleSignUpInFormBtn.dataset.animation = "switchToSignUp";
  },
  switchToSignUp: () => {
    const {
      signUpInMessageSpan,
      signUpInBtn,
      btnAnimationWrapper,
      toggleSignUpInFormBtn,
    } = elements;

    signUpInMessageSpan.innerHTML =
      "If you have already created an account and remember your email and password, click ";
    signUpInBtn.innerHTML = "WAKE UP";
    if (RED_PILL_STATE === "closed") {
      addRemoveClass(
        btnAnimationWrapper,
        "scroll-sign-up-btn-in-with-delay",
        "scoll-sign-up-btn-to-cover-input"
      );
    } else {
      addRemoveClass(
        btnAnimationWrapper,
        "scroll-sign-up-btn-in-no-delay",
        "scoll-sign-up-btn-to-cover-input"
      );
    }
    signUpInBtn.dataset.animation = "signUpAndContinue";
    toggleSignUpInFormBtn.dataset.animation = "switchToSignIn";
  },
};

export function signUpAndContinue() {
  console.log("signing up");

  function animateTransitionToQuotesPage() {
    const { redPillWrapper, fullPageOverlay } = elements;
    setTimeout(
      () =>
        addRemoveClass(redPillWrapper, "fade-element-out", "fade-element-in"),
      3000
    );
    setTimeout(() => {
      fullPageOverlay.classList.add("fade-in-green-background");
    }, 8000);
    setTimeout(
      () =>
        //fetch("/quotes")
        //  .then((response) => response.text())
        //  .then((pageHtml) => (document.body.innerHTML = pageHtml)),
        (window.location.href = "/static/quotesPage.html"),
      13000
    );
  }

  signUpUser().then(() => {
    rain();
    animateTransitionToQuotesPage();
  });
}
export function signInAndContinue() {
  signInUser();
}

function continueWithoutSignIn() {
  fetch("/quotes")
    .then((response) => response.text())
    .then((pageHtml) => (document.body.innerHTML = pageHtml));
}
