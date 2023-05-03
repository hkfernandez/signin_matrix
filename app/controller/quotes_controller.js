//MODULES
const { auth, db } = require("../model/firebase_services");
const { collection, addDoc, getDocs } = require("firebase/firestore");
const path = require("path");
const Quote = require("../model/Quote");

const quotesCollection = collection(db, "quotes");

//VARIABLES
const currentUser = auth.currentUser;

module.exports = {
  getQuotesPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../view/html/quotesPage.html"));
  },
  getAllQuotes: (req, res) => {
    getDocs(quotesCollection)
      .then((snapshot) => {
        let quotes = [];
        snapshot.forEach((doc) => {
          let quote = doc.data();
          quote.id = doc.id;
          quotes.push(quote);
        });
        res.json(quotes);
      })
      .catch((error) => res.send(error));
  },
  addQuote: ({ body: quoteData }, res) => {
    const quote = {
      text: quoteData.text,
      author: quoteData.author,
      userId: currentUser ? currentUser.uid : "",
    };
    addDoc(quotesCollection, quote)
      .then((quoteData) => console.log("new quote id: ", quoteData.id))
      .catch((error) => console.log(error));
  },
};
