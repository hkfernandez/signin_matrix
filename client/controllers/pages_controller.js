import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pagesController = {
  getAboutPage: (req, res) => {
    console.log("getting about page", req.params);
    res.sendFile(path.join(__dirname, "../static/html/aboutPage.html"));
  },
  getPillsPage: (req, res) => {
    console.log("getting pills page", req.params);
    res.sendFile(path.join(__dirname, "../static/html/pillsPage.html"));
  },
  getQuotesPage: (req, res) => {
    console.log("getting quotes page", req.params);
    res.sendFile(path.join(__dirname, "../static/html/quotesPage.html"));
  },
};
