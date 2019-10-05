const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Driver=require('../../model/admin/Driver_details');

//post driver details
router.post("/", (req, res, next) => {
    const driver = new Driver({
        DiverID: req.body.tname,
        nameofDriver: req.body.startstation,
        Address: req.body.destination,
        Phone: req.body.distance,
    });
    driver
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        message: "created product successfully",
        createdbrs: driver
    });
});


//get driver details
router.get("/", (req, res, next) => {
    Driver.find()
        .select("")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                driver: docs.map(doc => {
                    return {
                        DiverID: req.body.tname,
                        nameofDriver: req.body.startstation,
                        Address: req.body.destination,
                        Phone: req.body.distance,
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