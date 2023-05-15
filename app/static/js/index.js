//this file contains all the scripts for navigating to different pages
//since pages load into the pageWrapper div referenced here all navigation functions are defined here
//some functions are passed to the header component and others are passed to other scripts

import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
const { createScriptTag } = helperFunctions;

//ELEMENTS
const pageWrapper = document.getElementById("pageWrapper");
const headTag = document.getElementById("head");
const pageHeader = document.getElementById("pageHeader");

//LISTENERS
window.addEventListener("popstate", (event) => renderPage(event));

//PASS FUNCTIONS TO HEADER COMPONENT
pageHeader.fetchPillsPage = () =>
  fetchPage("/pillsPage", "/pills", [
    "/static/js/pillsPage.js",
    "/static/js/dependencies/signup.js",
  ]);

function removePreviousPageScripts() {
  const scriptTags = document.getElementsByTagName("script");
  Array.from(scriptTags).forEach((scriptTag) => {
    if (scriptTag.id.includes("pageScript")) {
      scriptTag.remove();
    }
  });
}
function fetchPage(route, path, scriptUrls) {
  //as a single page application boweser only renders index.html
  //fetchPage retreives html from browser and renders it to div
  //paths in browser are not defined on server but are used as parameters in fetchPage
  fetch(route)
    .then((response) => response.text())
    .then((pageHtml) => {
      history.pushState({ path }, null, path);
      removePreviousPageScripts();
      pageWrapper.innerHTML = pageHtml;
      for (let index = 0; index < scriptUrls.length; index++) {
        let scriptTag = createScriptTag(
          `pageScript${index}`,
          scriptUrls[index],
          "module"
        );
        headTag.appendChild(scriptTag);
      }
    })
    .catch((error) => console.log("ERROR IN FETCHING PAGE", error));
}

function renderPage(event) {
  //if there is an event the back button has been used
  let path = window.location.pathname;
  if (event) path = event.state.path;
  if (path === "/") path = "/home";
  if (path === "/home")
    fetchPage("/homePage", path, ["/static/js/homePage.js"]);
  if (path === "/pills")
    fetchPage("/pillsPage", path, [
      "/static/js/pillsPage.js",
      "/static/js/dependencies/signup.js",
    ]);
  if (path === "/quotes")
    fetchPage("/quotesPage", path, ["/static/js/quotesPage.js"]);
}
window.onload = () => renderPage();
