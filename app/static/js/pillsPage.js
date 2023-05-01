//MODULES
import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
import { rain } from "/static/js/dependencies/digitalRain.js";

//ELEMENTS
helperFunctions.addListenerReturnElement(".pill", "click", togglePillPosition);
document.getElementById("wakeUpBtn").addEventListener("click", wakeUp);
const digitalRainOverlay = document.getElementById("digitalRainOverlay");
const redPillWrapper = document.getElementById("redPillWrapper");
const bluePillWrapper = document.getElementById("bluePillWrapper");

//VARIABLES
let redPillState = "closed";
let bluePillState = "closed";

function addRemoveClass(element, addClass, removeClass) {
  console.log(element);
  element.classList.add(addClass);
  element.classList.remove(removeClass);
}

function animatePill(color, leftPill, rightPill) {
  if (color === "red") {
    //CLICKING ON RED PILL
    rightPill.classList.remove("text-hidden");
    if (redPillState === "closed") {
      addRemoveClass(bluePillWrapper, "fade-element-out", "fade-element-in");
      addRemoveClass(leftPill, "left-pill-open-red", "left-pill-close-red");
      addRemoveClass(rightPill, "right-pill-open-red", "right-pill-close-red");
      redPillState = "open";
    } else {
      addRemoveClass(bluePillWrapper, "fade-element-in", "fade-element-out");
      addRemoveClass(leftPill, "left-pill-close-red", "left-pill-open-red");
      addRemoveClass(rightPill, "right-pill-close-red", "right-pill-open-red");
      redPillState = "closed";
    }
  } else {
    //CLICKING ON BLUE PILL
    leftPill.classList.remove("text-hidden");
    if (bluePillState === "closed") {
      addRemoveClass(redPillWrapper, "fade-element-out", "fade-element-in");
      addRemoveClass(leftPill, "left-pill-open-blue", "left-pill-close-blue");
      addRemoveClass(
        rightPill,
        "right-pill-open-blue",
        "right-pill-close-blue"
      );
      bluePillState = "open";
    } else {
      addRemoveClass(redPillWrapper, "fade-element-in", "fade-element-out");
      addRemoveClass(leftPill, "left-pill-close-blue", "left-pill-open-blue");
      addRemoveClass(
        rightPill,
        "right-pill-close-blue",
        "right-pill-open-blue"
      );
      bluePillState = "closed";
    }
  }
}
function togglePillPosition({ currentTarget: pill }) {
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

function wakeUp() {
  rain();
}
