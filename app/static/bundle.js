/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/static/js/helperFunctions.js":
/*!******************************************!*\
  !*** ./app/static/js/helperFunctions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"helperFunctions\": () => (/* binding */ helperFunctions)\n/* harmony export */ });\nconst helperFunctions = {\n  disableButtons: (buttons) => {\n    buttons.forEach((button) => button.setAttribute(\"disabled\", \"\"));\n  },\n  enableButtons: (buttons) => {\n    buttons.forEach((button) => button.removeAttribute(\"disabled\"));\n  },\n  togglePwVisibility: (passwordInput, toggleButton) => {\n    if (passwordInput.type === \"password\") {\n      passwordInput.type = \"text\";\n      toggleButton.textContent = \"Hide\";\n    } else {\n      passwordInput.type = \"password\";\n      toggleButton.textContent = \"Show\";\n    }\n  },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvc3RhdGljL2pzL2hlbHBlckZ1bmN0aW9ucy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2lnbmluX21hdHJpeC8uL2FwcC9zdGF0aWMvanMvaGVscGVyRnVuY3Rpb25zLmpzP2RiNDIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGhlbHBlckZ1bmN0aW9ucyA9IHtcbiAgZGlzYWJsZUJ1dHRvbnM6IChidXR0b25zKSA9PiB7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKSk7XG4gIH0sXG4gIGVuYWJsZUJ1dHRvbnM6IChidXR0b25zKSA9PiB7XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSk7XG4gIH0sXG4gIHRvZ2dsZVB3VmlzaWJpbGl0eTogKHBhc3N3b3JkSW5wdXQsIHRvZ2dsZUJ1dHRvbikgPT4ge1xuICAgIGlmIChwYXNzd29yZElucHV0LnR5cGUgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkhpZGVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFzc3dvcmRJbnB1dC50eXBlID0gXCJwYXNzd29yZFwiO1xuICAgICAgdG9nZ2xlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTaG93XCI7XG4gICAgfVxuICB9LFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./app/static/js/helperFunctions.js\n");

/***/ }),

/***/ "./app/static/js/signupPage.js":
/*!*************************************!*\
  !*** ./app/static/js/signupPage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { helperFunctions } = __webpack_require__(/*! ./helperFunctions.js */ \"./app/static/js/helperFunctions.js\");\n\n//ELEMENTS\nconst signInBtn = document.getElementById(\"signInBtn\");\nsignInBtn.addEventListener(\"click\", signInUser);\nconst userNameInput = document.getElementById(\"userNameInput\");\nuserNameInput.addEventListener(\"blur\", validateUserName);\nconst passwordInput = document.getElementById(\"passwordInput\");\npasswordInput.addEventListener(\"blur\", validatePassword);\nconst togglePwVisibilityBtn = document.getElementById(\"togglePwVisibilityBtn\");\ntogglePwVisibilityBtn.addEventListener(\"click\", () =>\n  helperFunctions.togglePwVisibility(passwordInput, togglePwVisibilityBtn)\n);\nconst signUpBtn = document.getElementById(\"signUpBtn\");\nsignUpBtn.addEventListener(\"click\", signUpUser);\nconst usernameErMsgDiv = document.getElementById(\"usernameErMsg\");\nconst passwordErMsgDiv = document.getElementById(\"passwordErMsg\");\nconst signOutBtn = document.getElementById(\"signOutBtn\");\nsignOutBtn.addEventListener(\"click\", signOutUser);\n\n//CONSTANTS\nconst INPUT_ERROR_MESSAGES = {\n  USENAME: {\n    INVALID_FORMAT:\n      \"Username can only be letters and numbers or an email address\",\n  },\n  PASSWORD: {\n    TOO_LONG: \"Password is limited to 10 characters\",\n  },\n};\nconst limitedToCharAndNumRegex = /^[a-zA-Z0-9]+$/;\nconst emailFormatRegex =\n  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\nconst limitedToTenCharRegex = /^.{0,10}$/;\n\n//INPUT VALIDATION\nfunction setErrorMessage(message, errorMessageDiv) {\n  errorMessageDiv.textContent = message;\n}\nfunction checkFormValidity() {\n  let formValid = false;\n  const userNameErMessage = usernameErMsgDiv.textContent;\n  const passwordErMsg = passwordErMsgDiv.textContent;\n  if (\n    userNameErMessage === \"\" &&\n    passwordErMsg === \"\" &&\n    userNameInput.value !== \"\" &&\n    passwordInput.value !== \"\"\n  ) {\n    formValid = true;\n  }\n  if (formValid) {\n    helperFunctions.enableButtons([signUpBtn]);\n  } else helperFunctions.disableButtons([signUpBtn]);\n}\nfunction validateUserName() {\n  setErrorMessage(\"\", usernameErMsgDiv);\n  const userInput = userNameInput.value.trim();\n  if (userInput === \"\") {\n    return;\n  }\n  if (\n    !limitedToCharAndNumRegex.test(userInput) &&\n    !emailFormatRegex.test(userInput)\n  ) {\n    setErrorMessage(\n      INPUT_ERROR_MESSAGES.USENAME.INVALID_FORMAT,\n      usernameErMsgDiv\n    );\n  }\n  checkFormValidity();\n}\nfunction validatePassword() {\n  setErrorMessage(\"\", passwordErMsgDiv);\n  const userInput = passwordInput.value.trim();\n  if (userInput === \"\") {\n    return;\n  }\n  if (!limitedToTenCharRegex.test(userInput)) {\n    setErrorMessage(INPUT_ERROR_MESSAGES.PASSWORD.TOO_LONG, passwordErMsgDiv);\n  }\n  checkFormValidity();\n}\n\n//SIGN UP USER\nfunction signUpUser() {\n  fetch(\"/auth/signUp\", {\n    method: \"POST\",\n    body: JSON.stringify({\n      userName: userNameInput.value,\n      password: passwordInput.value,\n    }),\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\",\n    },\n  })\n    .then((response) => response.json())\n    .then((message) => {\n      if (message) {\n        helperFunctions.enableButtons([signOutBtn]);\n      }\n    })\n    .catch((error) => console.log(error));\n}\n\n//SIGN IN USER\nfunction signInUser() {\n  fetch(\"/auth/signIn\", {\n    method: \"POST\",\n    body: JSON.stringify({\n      userName: userNameInput.value,\n      password: passwordInput.value,\n    }),\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\",\n    },\n  })\n    .then((responsePromise) => responsePromise.json())\n    .then((message) => {\n      if (message) {\n        helperFunctions.enableButtons([signOutBtn]);\n        helperFunctions.disableButtons([signInBtn, signUpBtn]);\n      }\n    })\n    .catch((error) => console.log(error));\n}\n\n//SIGN OUT USER\nfunction signOutUser() {\n  fetch(\"/auth/signOut\")\n    .then((response) => response.json())\n    .then((message) => {\n      if (message) {\n        helperFunctions.enableButtons([signInBtn, signUpBtn]);\n        helperFunctions.disableButtons(signOutBtn);\n      }\n    })\n    .catch((error) => console.log(error));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvc3RhdGljL2pzL3NpZ251cFBhZ2UuanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxrQkFBa0IsRUFBRSxtQkFBTyxDQUFDLGdFQUFzQjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEVBQUU7QUFDaEMsa0NBQWtDLEtBQUs7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaWduaW5fbWF0cml4Ly4vYXBwL3N0YXRpYy9qcy9zaWdudXBQYWdlLmpzP2NjODQiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBoZWxwZXJGdW5jdGlvbnMgfSA9IHJlcXVpcmUoXCIuL2hlbHBlckZ1bmN0aW9ucy5qc1wiKTtcblxuLy9FTEVNRU5UU1xuY29uc3Qgc2lnbkluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5CdG5cIik7XG5zaWduSW5CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNpZ25JblVzZXIpO1xuY29uc3QgdXNlck5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlck5hbWVJbnB1dFwiKTtcbnVzZXJOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgdmFsaWRhdGVVc2VyTmFtZSk7XG5jb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZElucHV0XCIpO1xucGFzc3dvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCB2YWxpZGF0ZVBhc3N3b3JkKTtcbmNvbnN0IHRvZ2dsZVB3VmlzaWJpbGl0eUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9nZ2xlUHdWaXNpYmlsaXR5QnRuXCIpO1xudG9nZ2xlUHdWaXNpYmlsaXR5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICBoZWxwZXJGdW5jdGlvbnMudG9nZ2xlUHdWaXNpYmlsaXR5KHBhc3N3b3JkSW5wdXQsIHRvZ2dsZVB3VmlzaWJpbGl0eUJ0bilcbik7XG5jb25zdCBzaWduVXBCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25VcEJ0blwiKTtcbnNpZ25VcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2lnblVwVXNlcik7XG5jb25zdCB1c2VybmFtZUVyTXNnRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZUVyTXNnXCIpO1xuY29uc3QgcGFzc3dvcmRFck1zZ0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRFck1zZ1wiKTtcbmNvbnN0IHNpZ25PdXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25PdXRCdG5cIik7XG5zaWduT3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaWduT3V0VXNlcik7XG5cbi8vQ09OU1RBTlRTXG5jb25zdCBJTlBVVF9FUlJPUl9NRVNTQUdFUyA9IHtcbiAgVVNFTkFNRToge1xuICAgIElOVkFMSURfRk9STUFUOlxuICAgICAgXCJVc2VybmFtZSBjYW4gb25seSBiZSBsZXR0ZXJzIGFuZCBudW1iZXJzIG9yIGFuIGVtYWlsIGFkZHJlc3NcIixcbiAgfSxcbiAgUEFTU1dPUkQ6IHtcbiAgICBUT09fTE9ORzogXCJQYXNzd29yZCBpcyBsaW1pdGVkIHRvIDEwIGNoYXJhY3RlcnNcIixcbiAgfSxcbn07XG5jb25zdCBsaW1pdGVkVG9DaGFyQW5kTnVtUmVnZXggPSAvXlthLXpBLVowLTldKyQvO1xuY29uc3QgZW1haWxGb3JtYXRSZWdleCA9XG4gIC9eW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXStAW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKiQvO1xuY29uc3QgbGltaXRlZFRvVGVuQ2hhclJlZ2V4ID0gL14uezAsMTB9JC87XG5cbi8vSU5QVVQgVkFMSURBVElPTlxuZnVuY3Rpb24gc2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UsIGVycm9yTWVzc2FnZURpdikge1xuICBlcnJvck1lc3NhZ2VEaXYudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xufVxuZnVuY3Rpb24gY2hlY2tGb3JtVmFsaWRpdHkoKSB7XG4gIGxldCBmb3JtVmFsaWQgPSBmYWxzZTtcbiAgY29uc3QgdXNlck5hbWVFck1lc3NhZ2UgPSB1c2VybmFtZUVyTXNnRGl2LnRleHRDb250ZW50O1xuICBjb25zdCBwYXNzd29yZEVyTXNnID0gcGFzc3dvcmRFck1zZ0Rpdi50ZXh0Q29udGVudDtcbiAgaWYgKFxuICAgIHVzZXJOYW1lRXJNZXNzYWdlID09PSBcIlwiICYmXG4gICAgcGFzc3dvcmRFck1zZyA9PT0gXCJcIiAmJlxuICAgIHVzZXJOYW1lSW5wdXQudmFsdWUgIT09IFwiXCIgJiZcbiAgICBwYXNzd29yZElucHV0LnZhbHVlICE9PSBcIlwiXG4gICkge1xuICAgIGZvcm1WYWxpZCA9IHRydWU7XG4gIH1cbiAgaWYgKGZvcm1WYWxpZCkge1xuICAgIGhlbHBlckZ1bmN0aW9ucy5lbmFibGVCdXR0b25zKFtzaWduVXBCdG5dKTtcbiAgfSBlbHNlIGhlbHBlckZ1bmN0aW9ucy5kaXNhYmxlQnV0dG9ucyhbc2lnblVwQnRuXSk7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVVzZXJOYW1lKCkge1xuICBzZXRFcnJvck1lc3NhZ2UoXCJcIiwgdXNlcm5hbWVFck1zZ0Rpdik7XG4gIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXJOYW1lSW5wdXQudmFsdWUudHJpbSgpO1xuICBpZiAodXNlcklucHV0ID09PSBcIlwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChcbiAgICAhbGltaXRlZFRvQ2hhckFuZE51bVJlZ2V4LnRlc3QodXNlcklucHV0KSAmJlxuICAgICFlbWFpbEZvcm1hdFJlZ2V4LnRlc3QodXNlcklucHV0KVxuICApIHtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXG4gICAgICBJTlBVVF9FUlJPUl9NRVNTQUdFUy5VU0VOQU1FLklOVkFMSURfRk9STUFULFxuICAgICAgdXNlcm5hbWVFck1zZ0RpdlxuICAgICk7XG4gIH1cbiAgY2hlY2tGb3JtVmFsaWRpdHkoKTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gIHNldEVycm9yTWVzc2FnZShcIlwiLCBwYXNzd29yZEVyTXNnRGl2KTtcbiAgY29uc3QgdXNlcklucHV0ID0gcGFzc3dvcmRJbnB1dC52YWx1ZS50cmltKCk7XG4gIGlmICh1c2VySW5wdXQgPT09IFwiXCIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFsaW1pdGVkVG9UZW5DaGFyUmVnZXgudGVzdCh1c2VySW5wdXQpKSB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKElOUFVUX0VSUk9SX01FU1NBR0VTLlBBU1NXT1JELlRPT19MT05HLCBwYXNzd29yZEVyTXNnRGl2KTtcbiAgfVxuICBjaGVja0Zvcm1WYWxpZGl0eSgpO1xufVxuXG4vL1NJR04gVVAgVVNFUlxuZnVuY3Rpb24gc2lnblVwVXNlcigpIHtcbiAgZmV0Y2goXCIvYXV0aC9zaWduVXBcIiwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgdXNlck5hbWU6IHVzZXJOYW1lSW5wdXQudmFsdWUsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmRJbnB1dC52YWx1ZSxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIixcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBoZWxwZXJGdW5jdGlvbnMuZW5hYmxlQnV0dG9ucyhbc2lnbk91dEJ0bl0pO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbn1cblxuLy9TSUdOIElOIFVTRVJcbmZ1bmN0aW9uIHNpZ25JblVzZXIoKSB7XG4gIGZldGNoKFwiL2F1dGgvc2lnbkluXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHVzZXJOYW1lOiB1c2VyTmFtZUlucHV0LnZhbHVlLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSW5wdXQudmFsdWUsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIsXG4gICAgfSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2VQcm9taXNlKSA9PiByZXNwb25zZVByb21pc2UuanNvbigpKVxuICAgIC50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBoZWxwZXJGdW5jdGlvbnMuZW5hYmxlQnV0dG9ucyhbc2lnbk91dEJ0bl0pO1xuICAgICAgICBoZWxwZXJGdW5jdGlvbnMuZGlzYWJsZUJ1dHRvbnMoW3NpZ25JbkJ0biwgc2lnblVwQnRuXSk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xufVxuXG4vL1NJR04gT1VUIFVTRVJcbmZ1bmN0aW9uIHNpZ25PdXRVc2VyKCkge1xuICBmZXRjaChcIi9hdXRoL3NpZ25PdXRcIilcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgaGVscGVyRnVuY3Rpb25zLmVuYWJsZUJ1dHRvbnMoW3NpZ25JbkJ0biwgc2lnblVwQnRuXSk7XG4gICAgICAgIGhlbHBlckZ1bmN0aW9ucy5kaXNhYmxlQnV0dG9ucyhzaWduT3V0QnRuKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app/static/js/signupPage.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/static/js/signupPage.js");
/******/ 	
/******/ })()
;