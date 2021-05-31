const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
// const cors = require('cors');

/**
 * Error handling
 * @type {AppError}
 */
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

/**
 * //ROUTES DECLARATION
 * @type {*}
 */

const bookTimes = require("./routes/bookTimesRoutes");
const bookTitles = require("./routes/bookTitleRoutes");

const app = express();
// app.use(cors());
//Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));

//Middleware
//Security HTTP headers
// app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit request from same API
const limiter = rateLimit({
  //100 Request from same ip per hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this ip, please try again in a hour",
});

app.use("/api", limiter);

//Body parser ,reading data from body
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  express.json({
    limit: "50kb",
  })
);

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization agains XSS
app.use(xssClean());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(compression());

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

//ROUTES
app.use("/api/v1/book-times", bookTimes);
app.use("/api/v1/book-titles", bookTitles);

//Handle any wrong url,available for any http method
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
