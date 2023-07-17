import html from "./sign-up-in-form.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass, disableButtons, enableButtons, togglePwVisibility } =
  helperFunctions;
import {
  createUser,
  signInUser,
  signOutUser,
} from "../../js/dependencies/firebaseFrontendServices.js";

export class SignUpInForm extends HTMLElement {
  #elements = () => {
    return {
      btnAnimationWrapper: document.getElementById("btnAnimationWrapper"),
      passwordErMsgDiv: document.getElementById("passwordErMsg"),
      passwordInput: document.getElementById("passwordInput"),
      signOutBtn: document.getElementById("signOutUserBtn"),
      signUpInBtn: document.getElementById("signUpInBtn"),
      signUpInMessageSpan: document.getElementById("signUpInMessageSpan"),
      togglePwVisibilityBtns: document.getElementsByClassName(
        "togglePwVisibilityBtn"
      ),
      toggleSignUpInFormBtn: document.getElementById("toggleSignUpInFormBtn"),
      usernameErMsgDiv: document.getElementById("usernameErMsg"),
      userNameInput: document.getElementById("userNameInput"),
    };
  };
  //animations are called from the pills-page animations
  animations = {
    scrollSignUpInBtnToClosePosition: () => {
      const { btnAnimationWrapper } = this.#elements();
      addRemoveClass(
        btnAnimationWrapper,
        "scroll-sign-up-btn-out",
        "scroll-sign-up-btn-in-with-delay"
      );
      btnAnimationWrapper.classList.remove("scroll-sign-up-btn-in-no-delay");
      btnAnimationWrapper.classList.remove("scoll-sign-up-btn-to-cover-input");
    },
    switchToSignIn: () => {
      console.log("switching to signIN");
      const {
        signUpInMessageSpan,
        signUpInBtn,
        btnAnimationWrapper,
        toggleSignUpInFormBtn,
      } = this.#elements();

      signUpInMessageSpan.textContent =
        "If you need to create an account click ";

      signUpInBtn.innerHTML = "RE-ENTER";
      signUpInBtn.onclick = () => this.signIn();

      addRemoveClass(
        btnAnimationWrapper,
        "scoll-sign-up-btn-to-cover-input",
        "scroll-sign-up-btn-in-with-delay"
      );
      btnAnimationWrapper.classList.remove("scroll-sign-up-btn-in-no-delay");

      toggleSignUpInFormBtn.onclick = () => this.animations.switchToSignUp();
    },
    switchToSignUp: (PILL_STATE) => {
      console.log("switching to signUP");
      const {
        signUpInMessageSpan,
        signUpInBtn,
        btnAnimationWrapper,
        toggleSignUpInFormBtn,
      } = this.#elements();

      signUpInMessageSpan.innerHTML =
        "If you have already created an account and remember your email and password, click ";

      signUpInBtn.innerHTML = "WAKE UP";
      signUpInBtn.onclick = () => this.signUp();

      if (PILL_STATE === "closed") {
        addRemoveClass(
          btnAnimationWrapper,
          "scroll-sign-up-btn-in-with-delay",
          "scoll-sign-up-btn-to-cover-input"
        );
        btnAnimationWrapper.classList.remove("scroll-sign-up-btn-out");
      } else {
        addRemoveClass(
          btnAnimationWrapper,
          "scroll-sign-up-btn-in-no-delay",
          "scoll-sign-up-btn-to-cover-input"
        );
      }

      toggleSignUpInFormBtn.onclick = () => this.animations.switchToSignIn();
      //toggleSignUpInFormBtn.dataset.animation = "switchToSignIn";
    },
  };

  #INPUT_ERROR_MESSAGES = {
    USENAME: {
      INVALID_FORMAT:
        "Username can only be letters and numbers or an email address",
    },
    PASSWORD: {
      TOO_LONG: "Password is limited to 10 characters",
    },
  };
  #limitedToCharAndNumRegex = /^[a-zA-Z0-9]+$/;
  #emailFormatRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  #limitedToTenCharRegex = /^.{0,10}$/;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html;

    const {
      userNameInput,
      passwordInput,
      togglePwVisibilityBtns,
      toggleSignUpInFormBtn,
    } = this.#elements();
    userNameInput.addEventListener("blur", () => this.#validateUserName());
    passwordInput.addEventListener("blur", () => this.#validatePassword());
    Array.from(togglePwVisibilityBtns).forEach((btn) => {
      btn.onclick = (event) => togglePwVisibility(event);
    });
    toggleSignUpInFormBtn.onclick = () => this.animations.switchToSignIn();
  }

  #setErrorMessage(message, errorMessageDiv) {
    errorMessageDiv.textContent = message;
  }
  #checkFormValidity() {
    let formValid = false;
    const {
      userNameInput,
      passwordInput,
      signUpInBtn,
      usernameErMsgDiv,
      passwordErMsgDiv,
    } = this.#elements();
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
      enableButtons([signUpInBtn]);
    } else disableButtons([signUpInBtn]);
  }

  #validateUserName() {
    const { usernameErMsgDiv, userNameInput } = this.#elements();
    this.#setErrorMessage("", usernameErMsgDiv);
    const userInput = userNameInput.value.trim();
    if (userInput === "") {
      return;
    }
    if (
      !this.#limitedToCharAndNumRegex.test(userInput) &&
      !this.#emailFormatRegex.test(userInput)
    ) {
      setErrorMessage(
        this.#INPUT_ERROR_MESSAGES.USENAME.INVALID_FORMAT,
        usernameErMsgDiv
      );
    }
    this.#checkFormValidity();
  }
  #validatePassword() {
    const { passwordErMsgDiv, passwordInput } = this.#elements();
    this.#setErrorMessage("", passwordErMsgDiv);
    const userInput = passwordInput.value.trim();
    if (userInput === "") {
      return;
    }
    if (!this.#limitedToTenCharRegex.test(userInput)) {
      this.#setErrorMessage(
        this.#INPUT_ERROR_MESSAGES.PASSWORD.TOO_LONG,
        passwordErMsgDiv
      );
    }
    this.#checkFormValidity();
  }

  async signUp() {
    console.log("signing up");
    const { userNameInput, passwordInput } = this.#elements();
    const returnValue = await createUser(
      userNameInput.value,
      passwordInput.value
    );
    console.log(returnValue);
    return returnValue;
  }

  async signIn() {
    console.log("signing In");
    const { userNameInput, passwordInput } = this.#elements();
    const user = await signInUser(userNameInput.value, passwordInput.value);
    console.log("user: ", user);
    user
      .getIdTokenResult()
      .then((idTokenResult) =>
        console.log("claims.admin: ", idTokenResult.claims.admin)
      );
    //return user;
  }
}
