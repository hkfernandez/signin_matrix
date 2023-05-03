import { helperFunctions } from "/static/js/dependencies/helperFunctions.js";
const { addListenerReturnElement, addRemoveClass } = helperFunctions;

// ELEMENTS;
const quoteInput = document.getElementById("quoteInput");
const authorInput = document.getElementById("authorInput");
const quotesWrapper = document.getElementById("quotesWrapper");
const screen = addListenerReturnElement("#screen", "click", selectScreen);
const mouthPiece = addListenerReturnElement(
  "#mouthPiece",
  "click",
  openClosePhone
);
const openBtn = addListenerReturnElement("#openBtn", "click", openClosePhone);

//VARIABLES
const phoneMessages = {
  answer: "ANSWER THE PHONE",
  addQuote: "ADD A QUOTE",
};

//HELPER FUNCTIONS
function createElementWithTextAndClass(elementType, text, classString) {
  const element = document.createElement(elementType);
  element.textContent = text;
  element.classList.add(classString);
  return element;
}
function appendChildren(parentElement, childernArray) {
  childernArray.forEach((child) => parentElement.appendChild(child));
}
function clearFormInputs() {
  quoteInput.value = "";
  authorInput.value = "";
}

function selectScreen() {
  if (screen.textContent === phoneMessages.answer) {
    return;
  } else {
    addQuote();
  }
}

function openClosePhone({ target }) {
  if (screen.textContent === phoneMessages.answer) {
    addRemoveClass(mouthPiece, "open-phone", "close-phone");
    screen.textContent = phoneMessages.addQuote;
    openBtn.classList.add("btn-disabled");
    screen.classList.remove("btn-disabled");
    return;
  }
  if (target.id === "openBtn") {
    return;
  } else {
    addRemoveClass(mouthPiece, "close-phone", "open-phone");
    screen.textContent = phoneMessages.answer;
    openBtn.classList.remove("btn-disabled");
    screen.classList.add("btn-disabled");
    quoteInput.value = "";
    authorInput.value = "";
  }
}

function cleanUpUserInput() {
  let text = quoteInput.value.trim();
  let author = authorInput.value.trim();
  const textFirstCharacter = text[0];
  const textLastCharacter = text[text.length - 1];
  const authorFirstCharacter = author[0];
  if (textFirstCharacter === '"') {
    text = text.slice(1, text.length - 1).trim();
  }
  if (textLastCharacter === '"') {
    text = text.slice(0, text.length).trim();
  }
  if (authorFirstCharacter === "-") {
    author = author.slice(1).trim();
  }
  return { text, author };
}
function isValidQuote(quoteData) {
  let formValidity = true;
  if (quoteData.text === "" || quoteData.author === "") {
    formValidity = false;
  }
  return formValidity;
}

function addQuote() {
  const quoteData = cleanUpUserInput();
  if (!isValidQuote(quoteData)) {
    return;
  }
  fetch("/quotes/api", {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      clearFormInputs();
      return response.text();
    })
    .then((quoteId) => {
      quoteData.id = quoteId;
      addQuoteToPage(quoteData);
    })
    .catch((error) => console.log("POST quote error: ", error));
}

async function getAllQuotes() {
  try {
    const response = await fetch("/quotes/api");
    const quotes = response.json();
    return quotes;
  } catch {
    (error) => console.log(error);
  }
}
function createQuoteDiv(quote) {
  const quoteDiv = createElementWithTextAndClass("div", "", "quote-div");
  quoteDiv.dataset.id = quote.id;
  const text = createElementWithTextAndClass("p", quote.text, "quote-text");
  const textEmphasisTag = document.createElement("em");
  textEmphasisTag.appendChild(text);
  const author = createElementWithTextAndClass(
    "p",
    `- ${quote.author}`,
    "quote-author"
  );
  const user = createElementWithTextAndClass(
    "p",
    quote.userName ? quote.userName : "anonymous",
    "quote-user"
  );
  appendChildren(quoteDiv, [textEmphasisTag, author, user]);
  return quoteDiv;
}
function addQuoteToPage(quote) {
  const quoteDiv = createQuoteDiv(quote);
  quotesWrapper.appendChild(quoteDiv);
}
async function addQuotesToPage() {
  const quotes = await getAllQuotes();
  quotes.forEach((quote) => {
    addQuoteToPage(quote);
  });
}

addQuotesToPage();
