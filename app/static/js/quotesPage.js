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

function addQuote() {
  console.log("adding quote");
  const text = quoteInput.value;
  const author = authorInput.value;
  fetch("/quotes/api", {
    method: "POST",
    body: JSON.stringify({
      text,
      author,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
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
