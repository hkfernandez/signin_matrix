//this file contains all the scripts for navigating to different pages
//since pages load into the pageWrapper div referenced here all navigation functions are defined here
//some functions are passed to the header component and others are passed to other scripts

import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
const { createScriptTag } = helperFunctions;

//ELEMENTS
const pageWrapper = document.getElementById("pageWrapper");
const headTag = document.getElementById("head");
const pageHeader = document.getElementById("pageHeader");

//PASS FUNCTIONS TO HEADER COMPONENT
pageHeader.fetchPillsPage = fetchPillsPage;

function removePreviousPageScripts() {
  const scriptTags = document.getElementsByTagName("script");
  Array.from(scriptTags).forEach((scriptTag) => {
    if (scriptTag.id.includes("pageScript")) {
      scriptTag.remove();
    }
  });
}

function fetchPillsPage() {
  fetch("/pills")
    .then((response) => response.text())
    .then((pageHtml) => {
      removePreviousPageScripts();
      pageWrapper.innerHTML = pageHtml;
      let pillsScript = createScriptTag(
        "pageScript1",
        "/static/js/pillsPage.js",
        "module"
      );
      let signUpScript = createScriptTag(
        "pageScript2",
        "/static/js/dependencies/signup.js",
        "module"
      );
      headTag.appendChild(pillsScript);
      headTag.appendChild(signUpScript);
    })
    .catch((error) => console.log(error));
}

export function fetchQuotesPage() {
  fetch("/quotes")
    .then((response) => response.text())
    .then((pageHtml) => {
      removePreviousPageScripts();
      pageWrapper.innerHTML = pageHtml;
      let quotesScript = createScriptTag(
        "pageScript1",
        "/static/js/quotesPage.js",
        "module"
      );

      headTag.appendChild(quotesScript);
    })
    .catch((error) => console.log(error));
}
