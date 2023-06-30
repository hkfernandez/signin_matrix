//this file contains all the scripts for navigating to different pages
//since pages load into the contentWrapper div referenced here all navigation functions are defined here
//some functions are passed to the site header component and others are passed to other scripts

import { signOutUser } from "./dependencies/auth.js";

import { SiteHeader } from "../components/SiteHeader.js";
import { PageRouter } from "../components/PageRouter/page-router.js";
import { PillsPage } from "../components/PillsPage/pills-page.js";
import { AboutPage } from "../components/AboutPage/about-page.js";

customElements.define("site-header-component", SiteHeader);
customElements.define("page-router", PageRouter);
customElements.define("pills-page", PillsPage);
customElements.define("about-page", AboutPage);

//ELEMENTS
const contentWrapper = document.getElementById("contentWrapper");
const siteHeader = document.getElementById("siteHeader");

//LISTENERS

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

//function renderPage(path) {
//as a single page application boweser only renders index.html
//renderPage retreives html from browser and renders it to div
//paths in browser are not defined on server but are used as parameters in renderPage
//  const serverRoute = path + "Page";
//  fetch(serverRoute)
//    .then((response) => {
//      console.log("RESPONSE", ...response.headers);
//      return response.text();
//    })
//    .then((pageHtml) => {
//      setHistoryLoadScriptsAndHtml(path, pageHtml);
//    })
//    .catch((error) => {
//      console.log("ERROR IN FETCHING PAGE", error);
//      if (window.location.pathname === "/about") return;
//      renderPage("/about");
//    });
//}

function renderPage(path) {
  //as a single page application boweser only renders index.html
  //renderPage retreives html from browser and renders it to div
  //paths in browser are not defined on server but are used as parameters in renderPage
  //const pathWithoutSlash = path.slice(1);
  //const uppercasePathName =
  //  pathWithoutSlash.charAt(0).toUpperCase() + pathWithoutSlash.slice(1);
  //const pageName = uppercasePathName + "Page";
  //console.log("path", path);
  let selectedPage = getPageFromUrl();
  const pageComponent = document.createElement(selectedPage.component);
  console.log("pageComponent", pageComponent);
  console.log("contentWrapper", contentWrapper);
  //contentWrapper.appendChild(pageComponent);

  //return new [pageName]();
  //fetch(serverRoute)
  //  .then((response) => {
  //    console.log("RESPONSE", ...response.headers);
  //    return response.text();
  //  })
  //  .then((pageHtml) => {
  //    setHistoryLoadScriptsAndHtml(path, pageHtml);
  //  })
  //  .catch((error) => {
  //    console.log("ERROR IN FETCHING PAGE", error);
  //    if (window.location.pathname === "/about") return;
  //    renderPage("/about");
  //  });
}
async function setHistoryLoadScriptsAndHtml(path, pageHtml) {
  let pageScriptsPaths = javascriptPaths[path.slice(1) + "Page"];
  history.pushState({ path, pageHtml }, null, path);
  //removeContentWrapperRecreateAndAddToDom();
  removePreviousPageScriptTags();
  contentWrapper.innerHTML = pageHtml;
  addNewPageScriptTags(pageScriptsPaths);
}

//function renderPage(event) {
//  //if there is an event the back button has been used
//  let path = window.location.pathname;
//  if (path === "/") path = "/about";
//  if (event) {
//    event.preventDefault();
//    path = event.state.path;
//    let pageHtml = event.state.pageHtml;
//    setHistoryLoadScriptsAndHtml(path, pageHtml);
//    return;
//  }
//  renderPage(path);
//}

export const fetchQuotesPage = () => renderPage("/quotes");

siteHeader.signOut = signOutUser;

window.onload = () => {
  //renderPage();
};

//AUTH
