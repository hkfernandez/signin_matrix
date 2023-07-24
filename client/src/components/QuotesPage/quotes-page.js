import html from "./quotes-page.html";
import { helperFunctions } from "../../js/dependencies/helperFunctions.js";
const { addRemoveClass } = helperFunctions;
import { QuoteLi } from "../QuoteLi.js";

export class QuotesPage extends HTMLElement {
  #elements = () => {
    return {
      authorInput: document.getElementById("authorInput"),
      goToSignInPageBtn: document.getElementById("goToSignInPageBtn"),
      loginInfo: document.getElementById("loginInfo"),
      mouthPiece: document.getElementById("mouthPiece"),
      openBtn: document.getElementById("openBtn"),
      pageRouter: document.getElementById("pageRouter"),
      quoteInput: document.getElementById("quoteInput"),
      quotesList: document.getElementById("quotesList"),
      screen: document.getElementById("screen"),
    };
  };
  #PHONE_MESSAGES = {
    ANSWER: "ANSWER THE PHONE",
    ADD_QUOTE: "ADD A QUOTE",
  };
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = html;
    this.#setUpUi();
    const { screen, goToSignInPageBtn, mouthPiece, openBtn, pageRouter } =
      this.#elements();
    screen.addEventListener("click", (event) => this.#clickScreen(event));
    mouthPiece.addEventListener("click", (event) =>
      this.#openClosePhone(event)
    );
    openBtn.addEventListener("click", (event) => this.#openClosePhone(event));
    goToSignInPageBtn.addEventListener("click", () =>
      pageRouter.renderPage("pills")
    );
    this.#addQuotesToPage();
  }

  #clearFormInputs() {
    const { quoteInput, authorInput } = this.#elements();
    quoteInput.value = "";
    authorInput.value = "";
  }

  //UI & ANIMATIONS
  #clickScreen() {
    const { screen } = this.#elements();
    if (screen.textContent === this.#PHONE_MESSAGES.ANSWER) {
      return;
    } else {
      this.#addQuote();
    }
  }
  #openClosePhone({ target }) {
    const { screen, mouthPiece, openBtn, quoteInput, authorInput } =
      this.#elements();
    if (screen.textContent === this.#PHONE_MESSAGES.ANSWER) {
      addRemoveClass(mouthPiece, "open-phone", "close-phone");
      screen.textContent = this.#PHONE_MESSAGES.ADD_QUOTE;
      openBtn.classList.add("btn-disabled");
      screen.classList.remove("btn-disabled");
      return;
    }
    if (target.id === "openBtn") {
      return;
    } else {
      addRemoveClass(mouthPiece, "close-phone", "open-phone");
      screen.textContent = this.#PHONE_MESSAGES.ANSWER;
      openBtn.classList.remove("btn-disabled");
      screen.classList.add("btn-disabled");
      quoteInput.value = "";
      authorInput.value = "";
    }
  }

  #cleanUpUserInput() {
    const { quoteInput, authorInput } = this.#elements();
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

  #isValidQuote(quoteData) {
    let formValidity = true;
    if (quoteData.text === "" || quoteData.author === "") {
      formValidity = false;
    }
    return formValidity;
  }

  #addQuote() {
    const quoteData = this.#cleanUpUserInput();
    if (!this.#isValidQuote(quoteData)) {
      return;
    }
    fetch("/quotesApi", {
      method: "POST",
      body: JSON.stringify(quoteData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        this.#clearFormInputs();
        return response.text();
      })
      .then((quoteId) => {
        quoteData.id = quoteId;
        this.#addQuoteToPage(quoteData);
      })
      .catch((error) => console.log("POST quote error: ", error));
  }

  async #getAllQuotes() {
    try {
      const response = await fetch("/quotesApi");
      const quotes = response.json();
      return quotes;
    } catch {
      (error) => console.log(error);
    }
  }

  #createQuoteLi(quote) {
    const quoteLi = new QuoteLi();
    quoteLi.id = quote.id;
    quoteLi.shadowRoot.querySelector(
      ".quote-text"
    ).textContent = `"${quote.text}"`;
    quoteLi.shadowRoot.querySelector(
      ".quote-author"
    ).textContent = `- ${quote.author}`;
    return quoteLi;
  }

  #addQuoteToPage(quote) {
    const { quotesList } = this.#elements();
    const quoteLi = this.#createQuoteLi(quote);
    quotesList.insertBefore(quoteLi, quotesList.firstChild);
  }

  async #addQuotesToPage() {
    const quotes = await this.#getAllQuotes();
    quotes.forEach((quote) => {
      this.#addQuoteToPage(quote);
    });
  }
  #setUpUi() {
    const { loginInfo } = this.#elements();
    console.log("loginInfo.textContent", loginInfo.textContent);
    if (!loginInfo.textContent) {
      console.log("hiding elements");
      const adminElements = document.getElementsByClassName("admin");
      console.log(adminElements);
      Array.from(adminElements).forEach((element) => {
        element.classList.add("hidden");
      });
    }
  }
}
