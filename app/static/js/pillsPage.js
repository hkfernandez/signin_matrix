//MODULES
import { signInUser, signUpUser } from "./dependencies/signup.js";
import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
import { rain } from "/static/js/dependencies/digitalRain.js";

//IMPORTED FUNCTIONS
const { addListenerReturnElement, addRemoveClass, addRemoveClickListener } =
  helperFunctions;

//ELEMENTS
addListenerReturnElement(".pill", "click", togglePillPosition);
const signUpInBtn = document.getElementById("signUpInBtn");
const fullPageOverlay = document.getElementById("fullPageOverlay");
const redPillWrapper = document.getElementById("redPillWrapper");
const bluePillWrapper = document.getElementById("bluePillWrapper");
const signUpInMessage = document.getElementById("signUpInMessage");
const signUpInMessageText = document.getElementById("signUpInMessageText");
const toggleSignUpInFormBtn = addListenerReturnElement(
  "#toggleSignUpInFormBtn",
  "click",
  switchToSignIn
);
const btnAnimatonWrapper = document.getElementById("btnAnimationWrapper");

//VARIABLES
let redPillState = "closed";
let bluePillState = "closed";

export function switchToSignIn() {
  signUpInMessageText.textContent = "If you need to create an account click ";
  signUpInBtn.innerHTML = "RE-ENTER";
  addRemoveClass(
    btnAnimatonWrapper,
    "scoll-sign-up-btn-to-cover-input",
    "scroll-sign-up-btn-in-with-delay"
  );
  btnAnimatonWrapper.classList.remove("scroll-sign-up-btn-in-no-delay");
  addRemoveClickListener(signUpInBtn, signInAndContinue, signUpAndContinue);
  addRemoveClickListener(toggleSignUpInFormBtn, switchToSignUp, switchToSignIn);
}
export function switchToSignUp() {
  signUpInMessageText.innerHTML =
    "If you have already created an account and remember your email and password, click ";
  signUpInBtn.innerHTML = "WAKE UP";
  if (redPillState === "closed") {
    addRemoveClass(
      btnAnimatonWrapper,
      "scroll-sign-up-btn-in-with-delay",
      "scoll-sign-up-btn-to-cover-input"
    );
  } else {
    addRemoveClass(
      btnAnimatonWrapper,
      "scroll-sign-up-btn-in-no-delay",
      "scoll-sign-up-btn-to-cover-input"
    );
  }
  addRemoveClickListener(signUpInBtn, signUpAndContinue, signInAndContinue);
  addRemoveClickListener(toggleSignUpInFormBtn, switchToSignIn, switchToSignUp);
}

export function animatePill(color, leftPill, rightPill) {
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
    if (redPillState === "closed") {
      rightPill.classList.remove("text-hidden");
      openClosePill("red", "open");
      addRemoveClass(bluePillWrapper, "fade-element-out", "fade-element-in");
      addRemoveClass(
        signUpInMessage,
        "scroll-sign-in-message-in",
        "scroll-sign-in-message-out"
      );
      switchToSignUp();
      redPillState = "open";
    } else {
      openClosePill("red", "close");
      addRemoveClass(bluePillWrapper, "fade-element-in", "fade-element-out");
      addRemoveClass(
        signUpInMessage,
        "scroll-sign-in-message-out",
        "scroll-sign-in-message-in"
      );
      switchToSignIn();
      redPillState = "closed";
    }
  } else {
    //CLICKING ON BLUE PILL
    if (bluePillState === "closed") {
      leftPill.classList.remove("text-hidden");
      openClosePill("blue", "open");
      addRemoveClass(redPillWrapper, "fade-element-out", "fade-element-in");
      bluePillState = "open";
    } else {
      addRemoveClass(redPillWrapper, "fade-element-in", "fade-element-out");
      openClosePill("blue", "close");
      bluePillState = "closed";
    }
  }
}
export function togglePillPosition({ currentTarget: pill }) {
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
}

export function signUpAndContinue() {
  console.log("signing up");

  function animateTransitionToQuotesPage() {
    setTimeout(
      () =>
        addRemoveClass(redPillWrapper, "fade-element-out", "fade-element-in"),
      3000
    );
    setTimeout(
      () => fullPageOverlay.classList.add("fade-in-green-background"),
      8000
    );
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
