const mongoose = require("mongoose")
const {MONGO_DB_URI} = require("../config/dotEnv");

const mongooseConnection = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI, {
          // Remove deprecated options
        });
        console.log("MongoDB connected successfully");
      } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      }
}
module.exports = mongooseConnection