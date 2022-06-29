const mongoose = require("mongoose");

const Registration = mongoose.model("Registration", {
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  hashedPassword: String,  
});

module.exports = Registration;
