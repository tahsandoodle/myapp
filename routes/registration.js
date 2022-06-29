var express = require("express");
var router = express.Router();
var Registration = require("../models/registration");
var crypto = require("crypto");

// function isEmailExist(data) {
//      return data;
//   }

// router.post("/", function (req, res, next) {
//   const email= req.body["email"]

//   Registration.findOne({ email: email }).then((mail) => {
//      console.log("eeeeeeeeeeeeemail", mail);
//     if (!mail) {
//         isEmailExist(false)

//       res.status(404).send({
//         status: 404,
//         message: "No found.",
//       });
//     } else {
//         isEmailExist(true)
//       res.status(200).send({
//         status: 200,
//         message: "Email is exist",
//         email: email,
//       });
//     }
//   });
// });

function generateHash(password) {
  const hash = crypto.createHash("sha512");
  const hashedPassword = hash.update(password).digest("hex");
  return hashedPassword;
}

/* Post users listing. */
router.post("/", function (req, res, next) {
  const password = req.body["password"];
  const confirmPassword = req.body["confirmPassword"];
  if (password !== confirmPassword) {
    res.status(400).send({
      status: 400,
      message: `Password and confirm password do not match`,
    });
  }
  const hashedPassword = generateHash(password);

  const email = req.body["email"];

  Registration.findOne({ email: email }).then((mail) => {
    console.log("eeeeeeeeeeeeemail", mail);
    if (!mail) {
      const registration = new Registration({
        name: req.body["name"],
        email: req.body["email"],
        hashedPassword: hashedPassword,
      });
      registration
        .save()
        .then(() => {
          res.status(200).send({
            status: 200,
            message: "Registration complated successfully",
            registration: registration,
          });
        })
        .catch((error) => {
          res.status(500).send({
            status: 500,
            message: `Registration process failed unexpectedly.`,
          });
        });
    } else {
        res.send({
        message: "Email already exist",
        email: email,
      });
    }
  });
});

module.exports = router;
