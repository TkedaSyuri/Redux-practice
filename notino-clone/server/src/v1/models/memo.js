const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    dafault: "📝",
  },
  title: {
    type : String,
    default: "無題"
  },
  description: {
    type: String,
    dafault: "自由に記入して下さい。"
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    dafault: false
  },
  favoritePosition: {
    type: Number,
    dafault: 0
  }
});

module.exports = mongoose.model("Memo", memoSchema);
