var express = require("express");
var router = express.Router();
var Registration = require("../models/registration");
var crypto = require("crypto");

var isEmailExist = true;
router.get("/:email", function (req, res, next) {
  const email = req.params["email"];

  Registration.findOne({ email: email }).then((mail) => {
    // console.log("eeeeeeeeeeeeemail", mail);
    if (!mail) {
       isEmailExist = false;

      res.status(404).send({
        status: 404,
        message: "No found.",
      });

    }
    else{
        isEmailExist = true;
        res.status(200).send({
            status: 200,
            message: "Email is exist",
            email: email,
          });
        
    }
    
  });
});
console.log("isEmailExist",isEmailExist)

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
      console.log("errrrrrrrrrrrrrrrrrr", error);
      //if email already exist
      //   if (error.code === 11000) {
      //     res.status(400).send({
      //       status: 400,
      //       message: `Email id is already used.`,
      //     });
      //   }
      //   res.status(500).send({
      //     status: 500,
      //     message: `Registration process failed unexpectedly.`,
      //   });
    });
});

module.exports = router;
