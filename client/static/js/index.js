//this file contains all the scripts for navigating to different pages
//since pages load into the contentWrapper div referenced here all navigation functions are defined here
//some functions are passed to the site header component and others are passed to other scripts

import { signOutUser } from "./dependencies/auth.js";

import { SiteHeader } from "../components/SiteHeader.js";
import { PageRouter } from "../components/PageRouter/page-router.js";
import { PillsPage } from "../components/PillsPage/pills-page.js";
import { SignUpInForm } from "../components/SignUpInForm/sign-up-in-form.js";
import { AboutPage } from "../components/AboutPage/about-page.js";
import { QuotesPage } from "../components/QuotesPage/quotes-page.js";

customElements.define("site-header-component", SiteHeader);
customElements.define("page-router", PageRouter);
customElements.define("pills-page", PillsPage);
customElements.define("sign-up-in-form", SignUpInForm);
customElements.define("about-page", AboutPage);
customElements.define("quotes-page", QuotesPage);

//ELEMENTS
const contentWrapper = document.getElementById("contentWrapper");
const siteHeader = document.getElementById("siteHeader");
