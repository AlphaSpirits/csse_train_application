const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User=require('../../model/admin/temp_local_user_account');
const constants=require('../../constants');

//post train
router.post("/", (req, res, next) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(), //construcyor function automatically create and give a new & unique id
      userid: req.body.userid,
      loanstatus: constants.LOAN_STATUS,
      finestatus: constants.FINE_STATUS,
      cardtype: req.body.cardtype,
      cardnumber: req.body.cardnumber,
      amount: req.body.amount,
      initialamountstatus: constants.INITIAL_AMAOUNT_STATUS,
      loanamount: constants.LOAN_AMOUNT,
      fineamount: constants.FINE_AMOUNT
    });
    user
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  
    res.status(200).json({
      message: "created product successfully",
      createdbrs: user 
    });
  });

   //get train
   router.get("/", (req, res, next) => {
    User.find()
      .select("_id userid loanstatus finestatus cardtype cardnumber amount initialamountstatus loanamount fineamount")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          user: docs.map(doc => {
            return {
                _id:doc._id, 
                userid: doc.userid,
                loanstatus: doc.loanstatus,
                finestatus: doc.finestatus,
                cardtype: doc.cardtype,
                cardnumber: doc.cardnumber,
                amount: doc.amount,
                initialamountstatus: doc.initialamountstatus,
                loanamount: doc.loanamount,
                fineamount: doc.fineamount
            };
          })
        };
        if (docs.length > 0) {
          res.status(200).json(response);
        } else {
          res.status(404).json({
            message: "no entry found"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
   
  module.exports=router;