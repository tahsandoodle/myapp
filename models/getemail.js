// const mongoose = require("mongoose");
// const User = mongoose.model('User', Schema({
//     email: String,   
//   }));
  
//   // Empty `filter` means "match all documents"
//   const filter = {};
//   const all = await User.find(filter);
const mongoose = require("mongoose");

const Getmail = mongoose.model("Registration", {
  email: String,
 
});

module.exports = Getmail;
