const path = require("path");

module.exports = {
  getHomePage: (req, res) => {
    console.log("getting home page");
    res.sendFile(path.join(__dirname, "../view/html/index.html"));
  },
};
