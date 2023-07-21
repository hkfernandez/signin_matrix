export const helperFunctions = {
  addListenerReturnElement: (querySelector, eventType, callback) => {
    const selection = document.querySelectorAll(querySelector);
    if (!selection) {
      console.log("NO ELEMENTS FOUND WITH QUERY SELECTOR: ", querySelector);
      return null;
    }
    const selectionArray = Array.from(selection);
    if (selectionArray.length === 1) {
      const element = document.querySelector(querySelector);
      element.addEventListener(eventType, callback);
      return element;
    } else {
      selectionArray.forEach((element) =>
        element.addEventListener(eventType, callback)
      );
      return selectionArray;
    }
  },
  addRemoveClass: (element, addClass, removeClass) => {
    element.classList.add(addClass);
    void element.offsetWidth;
    element.classList.remove(removeClass);
  },
  addRemoveClickListener: (element, newFunction, oldFunction) => {
    element.removeEventListener("click", oldFunction);
    element.addEventListener("click", newFunction);
  },
  disableButtons: (buttons) => {
    buttons.forEach((button) => button.setAttribute("disabled", ""));
  },
  enableButtons: (buttons) => {
    buttons.forEach((button) => button.removeAttribute("disabled"));
  },
  setUpShadow: (element, html, css) => {
    const shadow = element.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `<style>${css}</style>${html}`;
    shadow.appendChild(template.content.cloneNode(true));
  },
  togglePwVisibility: ({ target: image }) => {
    const input = image.parentElement.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      //toggleButton.textContent = "Hide";
      image.src = "static/images/hide-svgrepo-com.svg";
    } else {
      input.type = "password";
      //toggleButton.textContent = "Show";
      image.src = "static/images/show-svgrepo-com.svg";
    }
  },
};
