const path = require("path");

module.exports = {
  getSinglePageApp: (req, res) => {
    console.log("getting single page app");
    res.sendFile(path.join(__dirname, "../view/html/index.html"));
  },
};
