import html from "./sign-up-in-form.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass, disableButtons, enableButtons, togglePwVisibility } =
  helperFunctions;
import {
  createUser,
  signInUser,
} from "../../js/dependencies/firebaseFrontendServices.js";
import { rain } from "../../js/dependencies/digitalRain.js";

export class SignUpInForm extends HTMLElement {
  #elements = () => {
    return {
      btnAnimationWrapper: document.getElementById("btnAnimationWrapper"),
      confirmPasswordInput: document.getElementById("confirmPasswordInput"),
      confirmPasswordErMsgDiv: document.getElementById("confirmPasswordErMsg"),
      fullPageOverlay: document.getElementById("fullPageOverlay"),
      loadingAnimation: document.getElementById("loadingAnimation"),
      pageRouter: document.getElementById("pageRouter"),
      passwordErMsgDiv: document.getElementById("passwordErMsg"),
      passwordInput: document.getElementById("passwordInput"),
      signUpInBtn: document.getElementById("signUpInBtn"),
      signUpInErMsg: document.getElementById("signUpInErMsg"),
      signUpInForm: document.getElementById("signUpInForm"),
      signUpInMessageSpan: document.getElementById("signUpInMessageSpan"),
      togglePwVisibilityBtns: document.getElementsByClassName(
        "togglePwVisibilityBtn"
      ),
      toggleSignUpInFormBtn: document.getElementById("toggleSignUpInFormBtn"),
      usernameErMsgDiv: document.getElementById("usernameErMsg"),
      userNameInput: document.getElementById("userNameInput"),
    };
  };
  animations = {
    transitionToQuotesPage: () => {
      const { fullPageOverlay, pageRouter } = this.#elements();
      addRemoveClass(fullPageOverlay, "fade-overlay-in", "hidden");
      rain();
      //setTimeout(() => {
      //  fullPageOverlay.classList.add("fade-overlay-to-green");
      //}, 3000);
      setTimeout(() => {
        pageRouter.renderPage("quotes");
      }, 13000);
    },
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
      const {
        signUpInMessageSpan,
        signUpInBtn,
        btnAnimationWrapper,
        toggleSignUpInFormBtn,
        confirmPasswordInput,
        confirmPasswordErMsgDiv,
        signUpInForm,
      } = this.#elements();

      signUpInMessageSpan.textContent =
        "If you need to create an account click ";

      //used to enable submit button in checkFormValidity()
      signUpInForm.dataset.type = "signIn";

      confirmPasswordInput.value = "";
      confirmPasswordErMsgDiv.textContent = "";

      this.#checkFormValidity();

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
      const {
        signUpInMessageSpan,
        signUpInBtn,
        btnAnimationWrapper,
        toggleSignUpInFormBtn,
        signUpInForm,
      } = this.#elements();

      signUpInMessageSpan.innerHTML =
        "If you have already created an account and remember your email and password, click ";

      //used to enable submit button in checkFormValidity()
      signUpInForm.dataset.type = "signUp";

      this.#checkFormValidity();

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
      INVALID_FORMAT: "Username must be an email address",
    },
    PASSWORD: {
      TOO_LONG: "Password is limited to 10 characters",
    },
    CONFIRM_PASSWORD: {
      PASSWORDS_NOT_MATCHING: "Passwords do not match",
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
      confirmPasswordInput,
      togglePwVisibilityBtns,
      toggleSignUpInFormBtn,
    } = this.#elements();
    userNameInput.addEventListener("blur", () => this.#validateUserName());
    passwordInput.addEventListener("blur", () => this.#validatePassword());
    confirmPasswordInput.addEventListener("blur", () =>
      this.#confirmPassword()
    );
    Array.from(togglePwVisibilityBtns).forEach((btn) => {
      btn.onclick = (event) => togglePwVisibility(event);
    });
    toggleSignUpInFormBtn.onclick = () => this.animations.switchToSignIn();
  }

  #checkFormValidity() {
    let formValid = false;
    const {
      userNameInput,
      passwordInput,
      confirmPasswordInput,
      signUpInBtn,
      usernameErMsgDiv,
      passwordErMsgDiv,
      confirmPasswordErMsgDiv,
      signUpInForm,
    } = this.#elements();
    const userNameErMessage = usernameErMsgDiv.textContent;
    const passwordErMsg = passwordErMsgDiv.textContent;
    const confirmPasswordErMsg = confirmPasswordErMsgDiv.textContent;
    if (
      (userNameErMessage === "" &&
        passwordErMsg === "" &&
        confirmPasswordErMsg === "" &&
        userNameInput.value !== "" &&
        passwordInput.value !== "" &&
        confirmPasswordInput.value !== "" &&
        signUpInForm.dataset.type === "signUp") ||
      (userNameErMessage === "" &&
        passwordErMsg === "" &&
        userNameInput.value !== "" &&
        passwordInput.value !== "" &&
        signUpInForm.dataset.type === "signIn")
    ) {
      formValid = true;
    }
    if (formValid) {
      enableButtons([signUpInBtn]);
    } else disableButtons([signUpInBtn]);
  }

  #validateUserName() {
    const { usernameErMsgDiv, userNameInput } = this.#elements();
    usernameErMsgDiv.textContent = "";
    const userInput = userNameInput.value.trim();

    if (!this.#emailFormatRegex.test(userInput)) {
      usernameErMsgDiv.textContent =
        this.#INPUT_ERROR_MESSAGES.USENAME.INVALID_FORMAT;
    }
    this.#checkFormValidity();
  }
  #validatePassword() {
    const { passwordErMsgDiv, passwordInput, confirmPasswordInput } =
      this.#elements();
    passwordErMsgDiv.textContent = "";
    const userInput = passwordInput.value.trim();

    if (!this.#limitedToTenCharRegex.test(userInput)) {
      passwordErMsgDiv.textContent =
        this.#INPUT_ERROR_MESSAGES.PASSWORD.TOO_LONG;
    }

    if (confirmPasswordInput !== "") this.#confirmPassword;

    this.#checkFormValidity();
  }

  #confirmPassword() {
    const { confirmPasswordErMsgDiv, confirmPasswordInput } = this.#elements();
    confirmPasswordErMsgDiv.textContent = "";
    const password = passwordInput.value.trim();
    const confirmedPassword = confirmPasswordInput.value.trim();

    if (password !== confirmedPassword) {
      confirmPasswordErMsgDiv.textContent =
        this.#INPUT_ERROR_MESSAGES.CONFIRM_PASSWORD.PASSWORDS_NOT_MATCHING;
    }
    this.#checkFormValidity();
  }
  #displaySignUpInErMsg(errorMessage) {
    const { passwordInput, confirmPasswordInput, signUpInErMsg } =
      this.#elements();
    signUpInErMsg.textContent = errorMessage;
    addRemoveClass(
      signUpInErMsg,
      "scroll-sign-up-in-er-msg-in",
      "scroll-sign-up-in-er-msg-out"
    );
    setTimeout(() => {
      addRemoveClass(
        signUpInErMsg,
        "scroll-sign-up-in-er-msg-out",
        "scroll-sign-up-in-er-msg-in"
      );
    }, 5000);

    passwordInput.value = "";
    confirmPasswordInput.value = "";

    this.#checkFormValidity();
  }

  async signUp() {
    const { userNameInput, passwordInput, loadingAnimation } = this.#elements();
    loadingAnimation.start();
    try {
      await createUser(userNameInput.value, passwordInput.value);
      setTimeout(() => loadingAnimation.stop(), 1000);
      this.animations.transitionToQuotesPage();
    } catch (errorMessage) {
      this.#displaySignUpInErMsg(errorMessage);
      setTimeout(() => loadingAnimation.stop(), 1000);
    }
  }

  async signIn() {
    const { userNameInput, passwordInput, pageRouter, loadingAnimation } =
      this.#elements();
    loadingAnimation.start();
    try {
      const userInfo = await signInUser(
        userNameInput.value,
        passwordInput.value
      );
      setTimeout(() => loadingAnimation.stop(), 1000);
      if (userInfo) {
        pageRouter.renderPage("quotes");
      }
    } catch (errorMessage) {
      this.#displaySignUpInErMsg(errorMessage);
      setTimeout(() => loadingAnimation.stop(), 1000);
    }
  }
}
