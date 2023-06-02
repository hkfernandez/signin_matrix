const path = require("path");

module.exports = {
  getSinglePageApp: (req, res) => {
    console.log("getting single page app", req.params);
    res.sendFile(path.join(__dirname, "../static/html/index.html"));
  },
};
