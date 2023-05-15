const path = require("path");

module.exports = {
  getHomePage: (req, res) => {
    console.log("getting home page");
    res.sendFile(path.join(__dirname, "../view/html/homePage.html"));
  },
  getPillsPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../view/html/pillsPage.html"));
  },
  getQuotesPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../static/html/quotesPage.html"));
  },
};
