//MODULES
import { db } from "../model/firebase_services.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const quotesCollection = collection(db, "quotes");

//VARIABLES

export const quotesController = {
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
      userId: "",
    };
    addDoc(quotesCollection, quote)
      .then((quoteData) => {
        console.log("new quote id: ", quoteData.id);
        res.send(quoteData.id);
      })
      .catch((error) => console.log(error));
  },
};
