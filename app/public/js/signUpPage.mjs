import { helperFunctions } from "./helperFunctions.mjs";

//ELEMENTS
const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", signInUser);
const userNameInput = document.getElementById("userNameInput");
userNameInput.addEventListener("blur", validateUserName);
const passwordInput = document.getElementById("passwordInput");
passwordInput.addEventListener("blur", validatePassword);
const togglePwVisibilityBtn = document.getElementById("togglePwVisibilityBtn");
togglePwVisibilityBtn.addEventListener("click", () =>
  helperFunctions.togglePwVisibility(passwordInput, togglePwVisibilityBtn)
);
const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", signUpUser);
const usernameErMsgDiv = document.getElementById("usernameErMsg");
const passwordErMsgDiv = document.getElementById("passwordErMsg");
const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", signOutUser);

//CONSTANTS
const INPUT_ERROR_MESSAGES = {
  USENAME: {
    INVALID_FORMAT:
      "Username can only be letters and numbers or an email address",
  },
  PASSWORD: {
    TOO_LONG: "Password is limited to 10 characters",
  },
};
const limitedToCharAndNumRegex = /^[a-zA-Z0-9]+$/;
const emailFormatRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const limitedToTenCharRegex = /^.{0,10}$/;

//INPUT VALIDATION
function setErrorMessage(message, errorMessageDiv) {
  errorMessageDiv.textContent = message;
}
function checkFormValidity() {
  let formValid = false;
  const userNameErMessage = usernameErMsgDiv.textContent;
  const passwordErMsg = passwordErMsgDiv.textContent;
  if (
    userNameErMessage === "" &&
    passwordErMsg === "" &&
    userNameInput.value !== "" &&
    passwordInput.value !== ""
  ) {
    formValid = true;
  }
  if (formValid) {
    helperFunctions.enableButtons([signUpBtn]);
  } else helperFunctions.disableButtons([signUpBtn]);
}
function validateUserName() {
  setErrorMessage("", usernameErMsgDiv);
  const userInput = userNameInput.value.trim();
  if (userInput === "") {
    return;
  }
  if (
    !limitedToCharAndNumRegex.test(userInput) &&
    !emailFormatRegex.test(userInput)
  ) {
    setErrorMessage(
      INPUT_ERROR_MESSAGES.USENAME.INVALID_FORMAT,
      usernameErMsgDiv
    );
  }
  checkFormValidity();
}
function validatePassword() {
  setErrorMessage("", passwordErMsgDiv);
  const userInput = passwordInput.value.trim();
  if (userInput === "") {
    return;
  }
  if (!limitedToTenCharRegex.test(userInput)) {
    setErrorMessage(INPUT_ERROR_MESSAGES.PASSWORD.TOO_LONG, passwordErMsgDiv);
  }
  checkFormValidity();
}

//SIGN UP USER
function signUpUser() {
  fetch("/auth/signUp", {
    method: "POST",
    body: JSON.stringify({
      userName: userNameInput.value,
      password: passwordInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((message) => {
      if (message) {
        helperFunctions.enableButtons([signOutBtn]);
      }
    })
    .catch((error) => console.log(error));
}

//SIGN IN USER
function signInUser() {
  fetch("/auth/signIn", {
    method: "POST",
    body: JSON.stringify({
      userName: userNameInput.value,
      password: passwordInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((responsePromise) => responsePromise.json())
    .then((message) => {
      if (message) {
        helperFunctions.enableButtons([signOutBtn]);
        helperFunctions.disableButtons([signInBtn, signUpBtn]);
      }
    })
    .catch((error) => console.log(error));
}

//SIGN OUT USER
function signOutUser() {
  fetch("/auth/signOut")
    .then((response) => response.json())
    .then((message) => {
      if (message) {
        helperFunctions.enableButtons([signInBtn, signUpBtn]);
        helperFunctions.disableButtons(signOutBtn);
      }
    })
    .catch((error) => console.log(error));
}
