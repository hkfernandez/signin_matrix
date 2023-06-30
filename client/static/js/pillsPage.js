//IMPORTED FUNCTIONS
//import { signInUser, signUpUser } from "./dependencies/signup.js";
//import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
//const { addRemoveClass } = helperFunctions;
//import { rain } from "/static/js/dependencies/digitalRain.js";
import { fetchQuotesPage } from "/static/js/index.js";

//LISTENERS
//document.addEventListener("click", delegateClickEvents);
//function delegateClickEvents(event) {
//  event.preventDefault();
//  const target = event.composedPath()[0];
//  const animation = target.dataset.animation;
//  console.log("animation name: ", animation);
//  if (!animation) return;
//  animations[animation](target);
//}

//ELEMENTS
//const elements = {
//  signUpInMessage: () => document.getElementById("signUpInMessage"),
//  bluePillWrapper: () => document.getElementById("bluePillWrapper"),
//  redPillWrapper: () => document.getElementById("redPillWrapper"),
//  signUpInMessageSpan: () => document.getElementById("signUpInMessageSpan"),
//  signUpInBtn: () => document.getElementById("signUpInBtn"),
//  btnAnimationWrapper: () => document.getElementById("btnAnimationWrapper"),
//  toggleSignUpInFormBtn: () => document.getElementById("toggleSignUpInFormBtn"),
//  fullPageOverlay: () => document.getElementById("fullPageOverlay"),
//};

//VARIABLES
//let RED_PILL_STATE = "closed";
//let BLUE_PILL_STATE = "closed";

//animation functions triggered by click delegation
//const animations = {
//  //secondary functions called to other animation functions
//  secondary: {
//    openClosePill: (pill, action) => {
//      const { pillColor, leftPill, rightPill } = pill;
//      let oppositeAction = "open";
//      if (action === "open") {
//        oppositeAction = "close";
//      }
//      addRemoveClass(
//        leftPill,
//        `left-pill-${action}-${pillColor}`,
//        `left-pill-${oppositeAction}-${pillColor}`
//      );
//      addRemoveClass(
//        rightPill,
//        `right-pill-${action}-${pillColor}`,
//        `right-pill-${oppositeAction}-${pillColor}`
//      );
//    },
//    parsePill: (pill) => {
//      const pillColor = pill.dataset.color;
//      let leftPill = null;
//      let rightPill = null;
//      if (pill.dataset.side === "left") {
//        leftPill = pill;
//        rightPill = leftPill.nextElementSibling;
//      } else {
//        rightPill = pill;
//        leftPill = pill.previousElementSibling;
//      }
//      return { pillColor, leftPill, rightPill };
//    },
//    scrollSignUpInBtnToClosePosition: () => {
//      const { btnAnimationWrapper } = elements;
//      addRemoveClass(
//        btnAnimationWrapper(),
//        "scoll-sign-up-btn-out",
//        "scroll-sign-up-btn-in-with-delay"
//      );
//      btnAnimationWrapper().classList.remove("scroll-sign-up-btn-in-no-delay");
//      btnAnimationWrapper().classList.remove(
//        "scoll-sign-up-btn-to-cover-input"
//      );
//    },
//    transitionToQuotesPage: () => {
//      const { fullPageOverlay } = elements;
//      addRemoveClass(fullPageOverlay(), "fade-overlay-in", "hidden");
//      rain();
//      //setTimeout(() => {
//      //  fullPageOverlay().classList.add("fade-overlay-to-green");
//      //}, 3000);
//      setTimeout(() => fetchQuotesPage(), 13000);
//    },
//    validatePillState: (leftPill) => {
//      if (
//        RED_PILL_STATE === "open" &&
//        leftPill.classList.contains("red") &&
//        !leftPill.classList.contains("left-pill-open-red")
//      ) {
//        RED_PILL_STATE = "closed";
//      }
//      if (
//        BLUE_PILL_STATE === "open" &&
//        leftPill.classList.contains("blue") &&
//        !leftPill.classList.contains("left-pill-open-blue")
//      ) {
//        RED_PILL_STATE = "closed";
//      }
//    },
//  },
//  switchToSignIn: () => {
//    const {
//      signUpInMessageSpan,
//      signUpInBtn,
//      btnAnimationWrapper,
//      toggleSignUpInFormBtn,
//    } = elements;

//    signUpInMessageSpan().textContent =
//      "If you need to create an account click ";
//    signUpInBtn().innerHTML = "RE-ENTER";
//    addRemoveClass(
//      btnAnimationWrapper(),
//      "scoll-sign-up-btn-to-cover-input",
//      "scroll-sign-up-btn-in-with-delay"
//    );
//    btnAnimationWrapper().classList.remove("scroll-sign-up-btn-in-no-delay");
//    signUpInBtn().dataset.animation = "signInAndContinue";
//    toggleSignUpInFormBtn().dataset.animation = "switchToSignUp";
//  },
//  switchToSignUp: () => {
//    const {
//      signUpInMessageSpan,
//      signUpInBtn,
//      btnAnimationWrapper,
//      toggleSignUpInFormBtn,
//    } = elements;

//    signUpInMessageSpan().innerHTML =
//      "If you have already created an account and remember your email and password, click ";
//    signUpInBtn().innerHTML = "WAKE UP";
//    if (RED_PILL_STATE === "closed") {
//      addRemoveClass(
//        btnAnimationWrapper(),
//        "scroll-sign-up-btn-in-with-delay",
//        "scoll-sign-up-btn-to-cover-input"
//      );
//      btnAnimationWrapper().classList.remove("scoll-sign-up-btn-out");
//    } else {
//      addRemoveClass(
//        btnAnimationWrapper(),
//        "scroll-sign-up-btn-in-no-delay",
//        "scoll-sign-up-btn-to-cover-input"
//      );
//    }
//    signUpInBtn().dataset.animation = "signUpAndContinue";
//    toggleSignUpInFormBtn().dataset.animation = "switchToSignIn";
//  },
//  togglePillOpenClose: (pill) => {
//    const { signUpInMessage, bluePillWrapper, redPillWrapper } = elements;
//    const { openClosePill, parsePill, validatePillState } =
//      animations.secondary;
//    const parsedPill = parsePill(pill);
//    const { pillColor, leftPill, rightPill } = parsedPill;

//    validatePillState(leftPill);

//    if (pillColor === "red") {
//      //CLICKING ON RED PILL
//      if (RED_PILL_STATE === "closed") {
//        rightPill.classList.remove("text-hidden");
//        openClosePill(parsedPill, "open");
//        addRemoveClass(
//          redPillWrapper(),
//          "scroll-red-pill-down",
//          "scroll-red-pill-up"
//        );
//        addRemoveClass(bluePillWrapper(), "fade-pill-out", "fade-pill-in");
//        addRemoveClass(
//          signUpInMessage(),
//          "scroll-sign-in-message-in",
//          "scroll-sign-in-message-out"
//        );
//        animations.switchToSignUp();
//        RED_PILL_STATE = "open";
//      } else {
//        openClosePill(parsedPill, "close");
//        addRemoveClass(
//          redPillWrapper(),
//          "scroll-red-pill-up",
//          "scroll-red-pill-down"
//        );
//        setTimeout(
//          () =>
//            addRemoveClass(bluePillWrapper(), "fade-pill-in", "fade-pill-out"),
//          2000
//        );
//        addRemoveClass(
//          signUpInMessage(),
//          "scroll-sign-in-message-out",
//          "scroll-sign-in-message-in"
//        );
//        animations.secondary.scrollSignUpInBtnToClosePosition();
//        RED_PILL_STATE = "closed";
//      }
//    } else {
//      //CLICKING ON BLUE PILL
//      if (BLUE_PILL_STATE === "closed") {
//        leftPill.classList.remove("text-hidden");
//        openClosePill(parsedPill, "open");
//        addRemoveClass(
//          bluePillWrapper(),
//          "scroll-blue-pill-up",
//          "scroll-blue-pill-down"
//        );
//        addRemoveClass(redPillWrapper(), "fade-pill-out", "fade-pill-in");
//        BLUE_PILL_STATE = "open";
//      } else {
//        setTimeout(
//          () =>
//            addRemoveClass(redPillWrapper(), "fade-pill-in", "fade-pill-out"),
//          3000
//        );
//        openClosePill(parsedPill, "close");
//        addRemoveClass(
//          bluePillWrapper(),
//          "scroll-blue-pill-down",
//          "scroll-blue-pill-up"
//        );
//        BLUE_PILL_STATE = "closed";
//      }
//    }
//  },
//  signInAndContinue: async () => {
//    const userSignedIn = await signInUser();
//    if (userSignedIn) {
//      animations.secondary.transitionToQuotesPage();
//    }
//  },
//};

export function signUpAndContinue() {
  signUpUser().then(() => {
    animations.transitionToQuotesPage();
  });
}

function continueWithoutSignIn() {
  fetch("/quotes")
    .then((response) => response.text())
    .then((pageHtml) => (document.body.innerHTML = pageHtml));
}
