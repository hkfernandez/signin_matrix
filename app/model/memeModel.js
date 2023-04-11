const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemesSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Enter a name for the meme"],
  },
  youtubeUrl: {
    type: String,
    trim: true,
    required: [true, "Enter a id for the meme"],
  },
});

const Memes = mongoose.model("Memes", MemesSchema);

module.exports = Memes;
