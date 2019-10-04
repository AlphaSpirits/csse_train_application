const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vehicle=require('../../model/admin/Vehicle_details');

//post driver details
router.post("/", (req, res, next) => {
    const vehicle = new Vehicle({
        Regnumber: req.body.Regnumber,
        name: req.body.name,
        routeID: req.body.routeID,
        DriverID: req.body.DriverID,
        type: req.body.type,
    });
    vehicle
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        message: "created product successfully",
        createdbrs: vehicle
    });
});


//get driver details
router.get("/", (req, res, next) => {
    Vehicle.find()
        .select("")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                vehicle: docs.map(doc => {
                    return {
                        Regnumber: req.body.Regnumber,
                        name: req.body.name,
                        routeID: req.body.routeID,
                        DriverID: req.body.DriverID,
                        type: req.body.type,
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