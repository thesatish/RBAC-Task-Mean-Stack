require("dotenv").config();
const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("✅ Databse Connected Successfully");

}).catch((err) => {
    console.log("❌ Databse Connection Failed : " + err);
})

module.exports = connection;




//another way to connct db
// require("dotenv").config();
// const mongoose = require("mongoose");

// const mongoURI = process.env.MONGO_URL;  // ✅ Read from .env file

// if (!mongoURI) {
//     console.error("❌ MONGO_URI is not defined in .env file");
//     process.exit(1);
// }

// mongoose
//     .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch((err) => console.error("❌ Connection failed:", err));



