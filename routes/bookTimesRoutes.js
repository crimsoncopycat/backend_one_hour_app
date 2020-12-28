const express = require("express");

const booksTimesController = require("../controllers/booksTimesController");
const router = express.Router();

router.route('/')
    .get(booksTimesController.getAllTimes)
    .post(booksTimesController.createNewTime);

router.route('/last-inserted').get(booksTimesController.getLastInserted);
router.route('/books').get(booksTimesController.getLastInserted);

router.route('/:id')
    .get(booksTimesController.getTime)
    .patch(booksTimesController.updateBooking);

module.exports = router;
