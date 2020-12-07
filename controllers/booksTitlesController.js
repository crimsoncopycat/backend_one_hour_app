const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("./../utils/appError");
const BookTitle = require("./../models/bookTitleModel");
exports.getAllBookTitle = factory.getAll(BookTitle);
exports.createNewBookTitle = factory.createOne(BookTitle);