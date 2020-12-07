const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Remote database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Local database
// const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection succesful");
  });

const app = require("./app");

// Start server
const port = process.env.PORT || 3000;
// console.log(process.env);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLER REJECTION! Shuting down... ");

  //Gracefully shut down server, close all opened connection
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! Shuting down... ");

  //Gracefully shut down server, close all opened connection
  server.close(() => {
    process.exit(1);
  });
});
