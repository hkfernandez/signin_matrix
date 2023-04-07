const memes_db = require("../model/memeModel");

module.exports = {
  findAll: function (req, res) {
    memes_db
      .find({})
      .then((memesData) => res.json(memesData))
      .catch((err) => res.status(422).json(err));
  },
  addMeme: async function ({ body: newMeme }, res) {
    console.log("new meme: ", newMeme);
    return await memes_db
      .create(newMeme)
      .then((returnedData) => res.json(returnedData))
      .catch((err) => console.log(err));
  },
};
