const express = require("express");

const booksTitlesController = require("../controllers/booksTitlesController");
const router = express.Router();

router.route('/')
    .get(booksTitlesController.getAllBookTitle)
    .post(booksTitlesController.createNewBookTitle);

module.exports = router;
