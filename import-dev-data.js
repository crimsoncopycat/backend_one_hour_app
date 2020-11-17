const fs = require("fs");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require("./models/tourModel");


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection succesful');
});

//Read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`,'utf-8'));

//Import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfully loaded');
  } catch (e) {
    console.log(e);
  } 
};

//Delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted successfully');
    } catch (e) {
        console.log(e);
    }
};

const args = process.argv;
if (args[2] === '--import') {
  importData();
} else if(args[2] === '--delete'){
    deleteData()
}

console.log(process.argv);