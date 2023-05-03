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

function animatePill(color, leftPill, rightPill) {
  if (color === "red") {
    //CLICKING ON RED PILL
    rightPill.classList.remove("text-hidden");
    if (redPillState === "closed") {
      helperFunctions.addRemoveClass(
        bluePillWrapper,
        "fade-element-out",
        "fade-element-in"
      );
      helperFunctions.addRemoveClass(
        leftPill,
        "left-pill-open-red",
        "left-pill-close-red"
      );
      helperFunctions.addRemoveClass(
        rightPill,
        "right-pill-open-red",
        "right-pill-close-red"
      );
      redPillState = "open";
    } else {
      helperFunctions.addRemoveClass(
        bluePillWrapper,
        "fade-element-in",
        "fade-element-out"
      );
      helperFunctions.addRemoveClass(
        leftPill,
        "left-pill-close-red",
        "left-pill-open-red"
      );
      helperFunctions.addRemoveClass(
        rightPill,
        "right-pill-close-red",
        "right-pill-open-red"
      );
      redPillState = "closed";
    }
  } else {
    //CLICKING ON BLUE PILL
    leftPill.classList.remove("text-hidden");
    if (bluePillState === "closed") {
      helperFunctions.addRemoveClass(
        redPillWrapper,
        "fade-element-out",
        "fade-element-in"
      );
      helperFunctions.addRemoveClass(
        leftPill,
        "left-pill-open-blue",
        "left-pill-close-blue"
      );
      helperFunctions.addRemoveClass(
        rightPill,
        "right-pill-open-blue",
        "right-pill-close-blue"
      );
      bluePillState = "open";
    } else {
      helperFunctions.addRemoveClass(
        redPillWrapper,
        "fade-element-in",
        "fade-element-out"
      );
      helperFunctions.addRemoveClass(
        leftPill,
        "left-pill-close-blue",
        "left-pill-open-blue"
      );
      helperFunctions.addRemoveClass(
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
  setTimeout(
    () =>
      helperFunctions.addRemoveClass(
        redPillWrapper,
        "fade-element-out",
        "fade-element-in"
      ),
    3000
  );
  setTimeout(
    () => digitalRainOverlay.classList.add("fade-in-green-background"),
    8000
  );
  setTimeout(
    () =>
      fetch("/quotes")
        .then((response) => response.text())
        .then((pageHtml) => (document.body.innerHTML = pageHtml)),
    13000
  );
}
