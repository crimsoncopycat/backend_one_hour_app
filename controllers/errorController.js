const AppError = require("./../utils/appError");
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDB = (err) => {
  const value = err.errmsg.match(
    /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/
  );
  const message = `Dublicate fields value ${value[0]}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  return new AppError(`Invalid token, Please log in again`, 401);
};

const handleJWTTokenExpire = (err) => {
  return new AppError(`Invalid token, Please log in again`, 401);
};

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  //RENDERED WEBSITE
  console.error("Error", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      //Log error
      console.error("Error", err);

      //Don't leak details to the client
      return res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  } else {
    if (err.isOperational) {
      //RENDERED WEBSITE
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message,
      });
    }

    //Log error
    console.error("Error", err);

    //Don't leak details to the client
    //RENDERED WEBSITE
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: "Please try again later",
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDublicateFieldsDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTTokenExpire(error);
    }
    sendErrorProd(error, req, res);
  }
};
