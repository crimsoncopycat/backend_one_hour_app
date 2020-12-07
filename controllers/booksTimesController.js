const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("./../utils/appError");
const BookTime = require("./../models/bookTimeModel");
exports.getAllTimes = factory.getAll(BookTime);
exports.createNewTime = factory.createOne(BookTime);
exports.updateBooking = factory.updateOne(BookTime);
exports.getLastInserted = factory.getLastEntry(BookTime);