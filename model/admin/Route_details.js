const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema

const RouteDetailsSchema = new Schema({
    routeID: {
        type: String,
        required: true
    },
    startingLocation: {
        type: String,
        required: true
    },
    destinationLocation: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
});

module.exports = RouteDetails = mongoose.model(
    "routeDetails",
    RouteDetailsSchema
);