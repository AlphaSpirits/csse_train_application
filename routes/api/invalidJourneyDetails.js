const express = require("express");
var moment = require("moment");
const router = express.Router();
const InValidJourneydetails = require("../../model/transportManager/invalidJourneyDetails");

//get data from db

//get all
router.get("/invalidjourneydetails", function(req, res, next) {
    InValidJourneydetails.find({}).then(function(invalidjourneydetails) {
    res.send(invalidjourneydetails);
  });
});


module.exports = router;
