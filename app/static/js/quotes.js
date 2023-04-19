// ELEMENTS;
const quoteInput = document.getElementById("quoteInput");
const addQuoteBtn = document.getElementById("addQuoteBtn");
addQuoteBtn.addEventListener("click", addQuote);
const authorInput = document.getElementById("authorInput");
const quotesWrapper = document.getElementById("quotesWrapper");

function addQuote() {
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
  const quoteDiv = document.createElement("div");
  quoteDiv.className = "quote-div";
  quoteDiv.dataset.id = quote.id;
  const text = document.createElement("p");
  text.textContent = quote.text;
  text.class = "quote-text";
  const author = document.createElement("p");
  author.textContent = quote.author;
  author.class = "quote-author";
  const user = document.createElement("p");
  user.textContent = quote.userName ? quote.userName : "anonymous";
  quoteDiv.appendChild(text);
  quoteDiv.appendChild(author);
  quoteDiv.appendChild(user);
  return quoteDiv;
}
function addQuoteToPage(quote) {
  const quoteDiv = createQuoteDiv(quote);
  quotesWrapper.appendChild(quoteDiv);
}
async function addQuotesToPage() {
  const quotes = await getAllQuotes();
  console.log("quotes: ", quotes);
  quotes.forEach((quote) => {
    addQuoteToPage(quote);
  });
}

addQuotesToPage();
