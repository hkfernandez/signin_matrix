//this file contains all the scripts for navigating to different pages
//since pages load into the contentWrapper div referenced here all navigation functions are defined here
//some functions are passed to the header component and others are passed to other scripts

import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
const {
  removePreviousPageScriptTags,
  addNewPageScriptTags,
  removeContentWrapperRecreateAndAddToDom,
} = helperFunctions;

//ELEMENTS
const contentWrapper = document.getElementById("contentWrapper");
const pageHeader = document.getElementById("pageHeader");

//LISTENERS
window.addEventListener("click", delegateClickEvent);
function delegateClickEvent(event) {
  //composed path helps when clicking on a web component
  //returns an array of the nodes crossed - innermost node first
  event.preventDefault();
  const linkPath = event.composedPath()[0].dataset.path;
  if (!linkPath || linkPath === window.location.pathname) return;
  fetchPage(linkPath);
}
window.onpopstate = (event) => {
  event.preventDefault();
  renderPage(event);
};

//VARIABLES
const javascriptPaths = {
  aboutPage: ["/static/js/aboutPage.js"],
  pillsPage: ["/static/js/pillsPage.js", "/static/js/dependencies/signup.js"],
  quotesPage: ["/static/js/quotesPage.js"],
};

function fetchPage(path) {
  //as a single page application boweser only renders index.html
  //fetchPage retreives html from browser and renders it to div
  //paths in browser are not defined on server but are used as parameters in fetchPage
  const serverRoute = path + "Page";
  fetch(serverRoute)
    .then((response) => response.text())
    .then((pageHtml) => {
      setHistoryLoadScriptsAndHtml(path, pageHtml);
    })
    .catch((error) => {
      console.log("ERROR IN FETCHING PAGE", error);
      if (window.location.pathname === "/about") return;
      fetchPage("/about");
    });
}
async function setHistoryLoadScriptsAndHtml(path, pageHtml) {
  let pageScriptsPaths = javascriptPaths[path.slice(1) + "Page"];
  history.pushState({ path, pageHtml }, null, path);
  //removeContentWrapperRecreateAndAddToDom();
  removePreviousPageScriptTags();
  contentWrapper.innerHTML = pageHtml;
  addNewPageScriptTags(pageScriptsPaths);
}

function renderPage(event) {
  //if there is an event the back button has been used
  let path = window.location.pathname;
  if (path === "/") path = "/about";
  if (event) {
    event.preventDefault();
    path = event.state.path;
    let pageHtml = event.state.pageHtml;
    setHistoryLoadScriptsAndHtml(path, pageHtml);
    return;
  }
  fetchPage(path);
}

export const fetchQuotesPage = () => fetchPage("/quotes");

window.onload = () => {
  renderPage();
};
