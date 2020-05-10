const mongoose = require("mongoose"); // import mongoose

const Schema = mongoose.Schema;

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const mentorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Mentor", mentorSchema); // create and export the model
