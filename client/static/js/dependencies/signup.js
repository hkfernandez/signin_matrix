import { helperFunctions } from "./helperFunctions.js";
//import { fetchQuotesPage } from "../index.js";

//IMPORTED FUNCTIONS
const {
  addRemoveClass,
  addListenerReturnElement,
  disableButtons,
  enableButtons,
  togglePwVisibility,
} = helperFunctions;

//ELEMENTS
const userNameInput = addListenerReturnElement(
  "#userNameInput",
  "blur",
  validateUserName
);
const passwordInput = addListenerReturnElement(
  "#passwordInput",
  "blur",
  validatePassword
);
addListenerReturnElement(".togglePwVisibilityBtn", "click", togglePwVisibility);
const usernameErMsgDiv = document.getElementById("usernameErMsg");
const passwordErMsgDiv = document.getElementById("passwordErMsg");
const signOutBtn = addListenerReturnElement(
  "#signOutBtn",
  "click",
  signOutUser
);

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
  //console.log("formValid: ", formValid);
  if (formValid) {
    enableButtons([signUpInBtn]);
  } else disableButtons([signUpInBtn]);
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
export function signUpUser() {
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
    //.then((message) => {
    //if (message) {
    //  helperFunctions.enableButtons([signOutBtn]);
    //}
    //  return message;
    //})
    .catch((error) => console.log(error));
}

//SIGN IN USER
export async function signInUser() {
  const message = await fetch("/auth/signIn", {
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
    .then((response) => {
      return response.message;
    })
    .catch((error) => console.log(error));
  return message;
}

//SIGN OUT USER
function signOutUser() {
  fetch("/auth/signOut")
    .then((response) => response.json())
    .then((message) => {
      if (message) {
        //enableButtons([signInBtn, signUpBtn]);
        //disableButtons(signOutBtn);
      }
    })
    .catch((error) => console.log(error));
}
