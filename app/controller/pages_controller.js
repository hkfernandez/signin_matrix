const path = require("path");

module.exports = {
  getPillsPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../view/html/pillsPage.html"));
  },
  getQuotesPage: (req, res) => {
    res.sendFile(path.join(__dirname, "../static/html/quotesPage.html"));
  },
};
