const path = require("path");

module.exports = {
  getAboutPage: (req, res) => {
    console.log("getting about page");
    res.sendFile(path.join(__dirname, "../view/html/aboutPage.html"));
  },
  getPillsPage: (req, res) => {
    console.log("getting pills page");
    res.sendFile(path.join(__dirname, "../view/html/pillsPage.html"));
  },
  getQuotesPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../static/html/quotesPage.html"));
  },
};
