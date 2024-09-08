const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of the book not provided"],
    unique: true
  },
  category: {
    type: String,
    required : true
  },
  rent_per_day: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Book", bookSchema);