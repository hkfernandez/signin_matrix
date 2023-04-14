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
};
