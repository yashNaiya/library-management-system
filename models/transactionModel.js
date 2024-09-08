const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
  book: {
    type:String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  issuedDate: {
    type: Date,
    required: true
  },
  returnedDate: {
    type: Date
  },
  rentGenerated: {
    type: Number,
    default: 0
  },
});

transactionSchema.pre('save', function (next) {

  if (this.returnedDate && this.issuedDate) {
    const rentPerDay = this.book.rent_per_day;
    const daysBorrowed = Math.ceil((this.returnedDate - this.issuedDate) / (1000 * 60 * 60 * 24));
    this.rentGenerated = rentPerDay * daysBorrowed;
  }
  next();
})

module.exports = mongoose.model("Transaction", transactionSchema);