const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).send(books);
})

const addBook = asyncHandler(async (req, res) => {
  const { name, category, rent_per_day } = req.body

  if (!name || !rent_per_day) {
    res.status(400);
    throw new Error("All required field are not provided")
  }
  const book = await Book.create({
    name,
    category,
    rent_per_day
  })

  res.status(201).json({ message: "Book Succesfully Added" })
})

const findBooks = asyncHandler((req,res)=>{
  const {category, maxRent, minRent, name} = req.body

  const query = {
    rent_per_day: {
      $gte: minRent,
      $lte: maxRent
    },
    name: {
      $regex: name, $options: "i"
    }
  };

  if (category) {
    query.category = category;
  }

  Book.find(query)
  .then(books=>{
    res.status(200).send(books)
  })
  .catch(err=>{
    res.send(err)
  })

})


const findBookByName = asyncHandler((req,res)=>{
  const {name} = req.body

  Book.find({name : {$regex: name, $options : "i"}})
  .then(books=>{
    res.status(200).send(books)
  })
  .catch(err=>{
    res.send(err)
  })
})

const findBookByRange = asyncHandler((req,res)=>{
  const {minRent, maxRent} = req.body

  Book.find({rent_per_day :{
    $gte : minRent,
    $lte : maxRent
  }})
  .then(books=>{
    res.status(200).send(books)
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = {
  getBooks,
  addBook,
  findBooks,
  findBookByName,
  findBookByRange
}