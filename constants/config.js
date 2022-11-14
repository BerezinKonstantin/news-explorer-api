require("dotenv").config();

module.exports = {
  DATA_BASE:
    "mongodb+srv://Konstantin:xfrRsW1D1KbVklYU@news.ivguhhc.mongodb.net/?retryWrites=true&w=majority",
  JWT_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_SECRET
      : "very-secret-key",
};
