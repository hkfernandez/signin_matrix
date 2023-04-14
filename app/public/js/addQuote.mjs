//ELEMENTS
const quoteInput = document.getElementById("quoteInput");
const addQuoteBtn = document.getElementById("addQuoteBtn");
addQuoteBtn.addEventListener("click", addQuote);

function addQuote() {
  const quote = quoteInput;
  fetch("/quotes", {
    method: "POST",
    body: JSON.stringify({
      quote,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(console.log(response));
}
