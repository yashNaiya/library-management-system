const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req,res)=>{
  const users = await User.find();
  res.status(200).send(users);
})

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("All required field are not provided")
  }
  const user = await User.create({
    name,
    email,
    password
  })

  res.status(201).json({ message: "User Succesfully Added" })
})

module.exports = {
  getUsers,
  addUser
}