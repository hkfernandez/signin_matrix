export const helperFunctions = {
  disableButtons: (buttons) => {
    buttons.forEach((button) => button.setAttribute("disabled", ""));
  },
  enableButtons: (buttons) => {
    buttons.forEach((button) => button.removeAttribute("disabled"));
  },
  togglePwVisibility: (passwordInput, toggleButton) => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show";
    }
  },
  addListenerReturnElement: (querySelector, eventType, callback) => {
    const selection = document.querySelectorAll(querySelector);
    if (!selection) {
      console.log("NO ELEMENTS FOUND WITH QUERY SELECTOR: ", querySelector);
      return null;
    }
    const selectionArray = Array.from(selection);
    if (selectionArray.length === 1) {
      selection.addEventListener(eventType, callback);
      return selection;
    } else {
      selectionArray.forEach((element) =>
        element.addEventListener(eventType, callback)
      );
      return selectionArray;
    }
  },
};
