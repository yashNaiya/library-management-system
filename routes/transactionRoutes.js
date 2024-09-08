const express = require("express")
const { issueBook, returnBook, getbookData, getBookRent, getUserData, getIssuedBoks} = require("../controllers/transactionControllers")

const router = express.Router()

router.route(`/`).post(issueBook).put(returnBook)

router.route(`/book-status`).get(getbookData)

router.route(`/user-status`).get(getUserData)

router.route(`/book-rent`).get(getBookRent)

router.route(`/book-issued`).get(getIssuedBoks)

module.exports = router