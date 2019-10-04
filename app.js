const express = require ('express');
const app=express();
const morgan=require('morgan');
const bodyPorser=require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//calling routes
const train = require("./routes/admin/trains");
const addcredits = require("./routes/local_passenger/add_credits");
const extendexpiredate = require("./routes//foreign_passenger/extend_expiary_date");
const applyloan=require("./routes/local_passenger/apply_loan");

//db connection

mongoose.connect(
    "mongodb+srv://admin:admin123@cssetraindb-sqygr.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);




//using dependencies
app.use(morgan("dev"));
app.use(bodyPorser.urlencoded({ extended: false }));
app.use(bodyPorser.json());
app.use(cors());





//using routes
app.use("/train", train);
app.use("/addcredits", addcredits);
app.use("/extentexpiarydate",extendexpiredate);
app.use("/applyloan",applyloan);
app.use("/api", require("./routes/api/inspectors"));
app.use("/api", require("./routes/api/journeyDetails"));
app.use("/api", require("./routes/api/invalidjourneydetails"));

//error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  module.exports = app;
