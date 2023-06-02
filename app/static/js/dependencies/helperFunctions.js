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
  removePreviousPageScriptTags: () => {
    const scriptTags = document.getElementsByTagName("script");
    Array.from(scriptTags).forEach((scriptTag) => {
      if (scriptTag.id.includes("pageScript")) {
        scriptTag.remove();
      }
    });
  },
  addNewPageScriptTags: (scriptPaths) => {
    function createScriptTag(tagId, source, tagType) {
      const scriptTag = document.createElement("script");
      scriptTag.id = tagId;
      scriptTag.src = source;
      scriptTag.type = tagType;
      return scriptTag;
    }

    for (let index = 0; index < scriptPaths.length; index++) {
      let scriptTag = createScriptTag(
        `pageScript${index + 1}`,
        scriptPaths[index],
        "module"
      );
      document.getElementsByTagName("body")[0].appendChild(scriptTag);
    }
  },
  removeContentWrapperRecreateAndAddToDom: () => {
    const oldContentWrapper = document.getElementById("contentWrapper");
    while (oldContentWrapper.firstChild) {
      oldContentWrapper.removeChild(oldContentWrapper.firstChild);
    }
    oldContentWrapper.remove();
    const newContentWrapper = document.createElement("div");
    newContentWrapper.id = "contentWrapper";
    newContentWrapper.style = "position: relative";
    document.body.appendChild(newContentWrapper);
  },
};
