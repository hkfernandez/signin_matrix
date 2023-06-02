const path = require("path");

module.exports = {
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
