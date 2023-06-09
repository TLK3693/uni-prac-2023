require("dotenv").config()
const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    
    console.log("MongoDB");
  } catch (error) {
    console.log("Что-то пошло не так");
    process.exit(1);
  }
};

module.exports = connectDB;
