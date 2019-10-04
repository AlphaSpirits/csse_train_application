const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ForeignPassenger =  require('../../model/users/foreign_passenger');

//get foreign passenger
router.get("/", (req, res, next) => {
    ForeignPassenger.find()
        .select("_id fPassengerName fPassengerAge fPassengerPassportNumber finestatus cardtype cardnumber amount initialamountstatus fineamount expireDate refUserId")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                localPassenger: docs.map(doc => {
                    return {
                        _id:doc._id,
                        fPassengerName: doc.fPassengerName,
                        fPassengerAge: doc.fPassengerAge,
                        fPassengerPassportNumber: doc.fPassengerPassportNumber,
                        finestatus: doc.finestatus,
                        cardtype: doc.cardtype,
                        cardnumber: doc.cardnumber,
                        amount: doc.amount,
                        initialamountstatus: doc.initialamountstatus,
                        fineamount: doc.fineamount,
                        expireDate: doc.expireDate,
                        refUserId: doc.refUserId
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

//delete foreign passenger
router.delete("/:foreignPassengerId", (req, res, next) => {
    ForeignPassenger.remove({ _id: req.params.foreignPassengerId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Foreign user has been deleted'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

});


module.exports=router;