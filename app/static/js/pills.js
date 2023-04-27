//MODULES
import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";

//ELEMENTS
helperFunctions.addListenerReturnElement(".pill", "click", togglePill);
const redPillWrapperOverlay = document.getElementById("redPillWrapperOverlay");
const bluePillWrapperOverlay = document.getElementById(
  "bluePillWrapperOverlay"
);

let redPillState = "closed";
let bluePillState = "closed";

function addRemoveClass(element, addClass, removeClass) {
  element.classList.add(addClass);
  element.classList.remove(removeClass);
}

function fadeOverlay(overlay, newAnimationClass) {
  overlay.className = "overlay";
  overlay.classList.add(newAnimationClass);
}

function animatePill(color, leftPill, rightPill) {
  if (color === "red") {
    rightPill.classList.remove("text-hidden");
    if (redPillState === "closed") {
      fadeOverlay(bluePillWrapperOverlay, "fade-overlay-in");
      addRemoveClass(leftPill, "open-left-hide-text", "close-left-show-text");
      addRemoveClass(
        rightPill,
        "open-right-show-text",
        "close-right-hide-text"
      );
      redPillState = "open";
    } else {
      fadeOverlay(bluePillWrapperOverlay, "fade-overlay-out");
      addRemoveClass(leftPill, "close-left-show-text", "open-left-hide-text");
      addRemoveClass(
        rightPill,
        "close-right-hide-text",
        "open-right-show-text"
      );
      redPillState = "closed";
    }
  } else {
    //BLUE PILL
    leftPill.classList.remove("text-hidden");
    if (bluePillState === "closed") {
      fadeOverlay(redPillWrapperOverlay, "fade-overlay-in");
      addRemoveClass(leftPill, "open-left-show-text", "close-left-hide-text");
      addRemoveClass(
        rightPill,
        "open-right-hide-text",
        "close-right-show-text"
      );
      bluePillState = "open";
    } else {
      fadeOverlay(redPillWrapperOverlay, "fade-overlay-out");
      addRemoveClass(leftPill, "close-left-hide-text", "open-left-show-text");
      addRemoveClass(
        rightPill,
        "close-right-show-text",
        "open-right-hide-text"
      );
      bluePillState = "closed";
    }
  }
}
function togglePill({ currentTarget: pill }) {
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
