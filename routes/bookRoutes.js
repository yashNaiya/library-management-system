const express = require("express")
const {getBooks, addBook, findBookByName, findBookByRange, findBooks} = require("../controllers/bookControllers")

const router = express.Router()

router.route(`/`).get(getBooks).post(addBook)

router.route(`/findBooks`).get(findBooks)

router.route(`/findBookByName`).get(findBookByName)

router.route(`/findBookByRange`).get(findBookByRange)

module.exports = router
