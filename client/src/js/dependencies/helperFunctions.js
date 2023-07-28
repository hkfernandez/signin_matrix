export const helperFunctions = {
  addRemoveClass: (element, addClass, removeClass) => {
    element.classList.add(addClass);
    void element.offsetWidth;
    element.classList.remove(removeClass);
  },
  disableButtons: (buttons) => {
    buttons.forEach((button) => button.setAttribute("disabled", ""));
  },
  enableButtons: (buttons) => {
    buttons.forEach((button) => button.removeAttribute("disabled"));
  },
  randomIntFromInterval: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  togglePwVisibility: ({ target: image }) => {
    const input = image.parentElement.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      image.src = "static/images/hide-svgrepo-com.svg";
    } else {
      input.type = "password";
      image.src = "static/images/show-svgrepo-com.svg";
    }
  },
};
