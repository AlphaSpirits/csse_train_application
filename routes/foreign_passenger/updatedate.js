const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User=require('../../model/users/foreign_passenger');
const constants=require('../../constants');
var moment = require("moment");
var momentt = require("moment-timezone");

//router.post("/", function(req, res, next) {
    //For stats
  //expireDate
    //console.log(req.body.expireDate);
    // var fomatted_journeydate = momentt(req.body.journeryDate)
    //   .tz("GMT")
    //   .format("YYYY-DD-MM");
  
    // var currentdate = new Date();
  
    // var fomatted_currentdate = moment(currentdate.toString())
    //   .tz("GMT")
    //   .format("YYYY-DD-MM");
  
    // var day = momentt(req.body.journeryDate)
    //   .tz("GMT")
    //   .format("ddd");
    // console.log(day);
    // var hour = momentt(req.body.journeryDate)
    //   .tz("GMT")
    //   .format("H");
  
    // console.log(hour);
    // console.log(fomatted_journeydate);
    // console.log(fomatted_currentdate);
  
    // //Token Validity check
  
  
    // if (fomatted_journeydate == fomatted_currentdate) {
    //   ValidJourneydetails.create(req.body)
    //     .then(function(validjourneydetails) {
    //       res.send(validjourneydetails);
    //     })
    //     .catch(next);
    // } else {
    //   InValidJourneydetails.create(req.body)
    //     .then(function(invalidjourneydetails) {
    //       res.send(invalidjourneydetails);
    //     })
    //     .catch(next);
    // }
 // });
var fineamountt=5555;
 router.patch('/:refUserId',(req,res,next)=>{
    const refUserId = req.params.refUserId;
    User.update({_id:refUserId},{$set:{fineamount:fineamountt}})
    .exec()
    .then(result => {
       console.log(result);
       res.status(200).json(result);
    })
    
       console.log(err);
       res.status(500).json({
         error:err
       });
    });


//   router.put("/id/:userid/:date", function(req, res, next) {
//     //   console.log(req.params.userid);
//     //   console.log(req.params.date);
//     //   var day=req.params.date;

//     //   var dd=moment(day).subtract('months', 1);
//     //  // const formatted = moment(dd).format('yyyyMMdd');
//     //  const formatted=new moment(dd,'yyyyMMddHHmmssfff').toDate()
//     //   console.log("day "+day);
//     //   console.log("moment "+dd);
//     //   console.log("formatted "+formatted);
   
      
//      User.findByIdAndUpdate({ _id: req.params.userid }, req.body).then(
//        function() {
//        User.findOne({ refUserId: req.params.userid })
//            .then(function(user) {
//              res.send(user);
//           })
//            .catch(next);
//        }
//      );
    
//   });

router.put("/id/:userid/:date", function(req, res, next) {
    console.log("date "+req.params.date);
    var day=req.params.date;
    var dd=moment(day).add('months', 2);
    const formatted=new moment(dd,'yyyyMMddHHmmssfff').toDate()
    console.log("substracted date "+formatted);

    User.findByIdAndUpdate({ _id: req.params.userid }, {expireDate:formatted}).then(
      function() {
        User.findOne({ _id: req.params.userid })
          .then(function(user) {
            res.send(user);
          })
          .catch(next);
      }
    );
  });

  module.exports=router;