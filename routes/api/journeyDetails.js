const express = require("express");
var moment = require("moment");
const router = express.Router();
const ValidJourneydetails = require("../../model/transportManager/validJourneyDetails");
const InValidJourneydetails = require("../../model/transportManager/invalidJourneyDetails");

//get data from db

//get all
router.get("/journeydetails", function(req, res, next) {
  ValidJourneydetails.find({}).then(function(validjourneydetails) {
    res.send(validjourneydetails);
  });
});

//add data to db
router.post("/journeydetails", function(req, res, next) {
  //var fomatted_journeydate = moment(req.body.journeryDate).format("YYYY-DD-MM");
  var currentdate = new Date();
  var fomatted_currentdate = moment(currentdate.toString()).format(
    "YYYY-DD-MM"
  );
   

  if (req.body.journeryDate == fomatted_currentdate) {
    ValidJourneydetails.create(req.body)
      .then(function(validjourneydetails) {
        res.send(validjourneydetails);
      })
      .catch(next);
  } else {
    InValidJourneydetails.create(req.body)
      .then(function(invalidjourneydetails) {
        res.send(invalidjourneydetails);
      })
      .catch(next);
  }
});

module.exports = router;
