const asyncHandler = require(`express-async-handler`);
const Book = require("../models/bookModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const issueBook = asyncHandler(async (req, res) => {
  const { book, user } = req.body
  const issuedDate = Date.now()

  const findBook = await Book.findOne({ name: book });
  if (!findBook) {
    return res.status(404).json({ message: 'Book not found' });
  }
  const userFind = await User.findOne({ name: user })
  if (!userFind) {
    return res.status(404).json({ message: 'User not found' });
  }

  const existingBorrowing = await Transaction.findOne({
    book,
    returnedDate: null,
  });

  if (existingBorrowing) {
    return res.status(400).json({ message: 'This book is already issued and has not been returned yet' });
  }

  const transaction = await Transaction.create({
    book,
    user,
    issuedDate
  })

  res.status(201).json({ message: "Book Succesfully Borrowed" })
})


const returnBook = asyncHandler(async(req,res)=>{
  const {book , user} = req.body
  
  const issueRecord = await Transaction.findOne({
    book,
    user,
    returnedDate: null
  })

  if(!issueRecord)
    res.status(404).json({ message: "Record Not Found" })

  if (issueRecord.returnedDate) {
    return res.status(400).json({ message: 'Book has already been returned' });
  }
  issueRecord.returnedDate = Date.now()

  issueRecord.save()
  res.status(201).json({ message: "Book Succesfully Returned" })
})

const getbookData = asyncHandler(async(req,res)=>{
  const {book} = req.body

  const bookRecord = await Transaction.find({book})

  if (bookRecord.length === 0) {
    return res.status(404).json({ message: "No transactions found for this book" });
  }

  const totalIssuedCount = bookRecord.length;

  const currentTransaction = bookRecord.find(txn => !txn.returnedDate);

  let response = {
    totalIssuedCount,
    currentlyIssued: null,
    status: 'Not issued at the moment'
  };

  if (currentTransaction) {
    response.currentlyIssued = {
      user: currentTransaction.user,
      issuedDate: currentTransaction.issuedDate
    };
    response.status = 'Currently issued';
  }

  res.json(response);
})

const getBookRent = asyncHandler(async(req,res)=>{
  const {book} = req.body

  const transactions = await Transaction.find({ book });

  if (transactions.length === 0) {
    return res.status(404).json({ message: "No transactions found for this book" });
  }

  const totalRentGenerated = transactions.reduce((sum, transaction) => sum + transaction.rentGenerated, 0);

  res.json({ book, totalRentGenerated });

})

const getUserData = asyncHandler(async(req,res)=>{
  const {user} = req.body
  const transactions = await Transaction.find({ user });

  if (transactions.length === 0) {
    return res.status(404).json({ message: "No books issued to this person" });
  }

  const issuedBooks = transactions.map(transaction => ({
    book: transaction.book,
    issuedDate: transaction.issuedDate,
    returnedDate: transaction.returnedDate || "Not returned"
  }));

  res.json({ user, issuedBooks });
})

const getIssuedBoks = asyncHandler(async(req,res)=>{
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) 
    res.status(400).json({ message: "Please provide both startDate and endDate in the query params." });
  
  const transactions = await Transaction.find({
    issuedDate: { 
      $gte: new Date(startDate), 
      $lte: new Date(endDate)
    }
  });

  if (transactions.length === 0)
    return res.status(404).json({ message: "No books issued in the given date range" });
  
  const issuedBooks = transactions.map(transaction => ({
    book: transaction.book,
    user: transaction.user,
    issuedDate: transaction.issuedDate
  }));

  res.status(201).json({ issuedBooks });
})


module.exports = {
  issueBook,
  returnBook,
  getbookData,
  getBookRent,
  getUserData,
  getIssuedBoks
}