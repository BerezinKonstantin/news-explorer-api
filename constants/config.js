require("dotenv").config();

module.exports = {
  DATA_BASE:
    process.env.NODE_ENV === "production"
      ? process.env.DATA_BASE
      : "mongodb://localhost:27017/news",
  JWT_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_SECRET
      : "very-secret-key",
};
