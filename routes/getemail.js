var express = require("express");
var router = express.Router();
var Registration = require("../models/registration");
var crypto = require("crypto");



/* Post users listing. */


router.get("/xyz", function (req, res, next) {
    Registration.find().then((email) => {
      res.status(200).send({
        status: 200,
        message: "All email list retrieved successfully.",
        email: email,
        
      });
    });
  });

module.exports = router;
