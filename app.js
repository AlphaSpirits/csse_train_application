const express = require ('express');
const app=express();
const morgan=require('morgan');
const bodyPorser=require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Importing routes
const train = require("./routes/admin/trains");
const UserRoutes = require("./routes/users/user_route");
const ManagerRoutes = require("./routes/users/managerroute");
const addcredits = require("./routes/local_passenger/add_credits");
const extendexpiredate = require("./routes//foreign_passenger/extend_expiary_date");
const applyloan=require("./routes/local_passenger/apply_loan");
const LocalPassenger = require("./routes/users/local_passengerroute");
const ForeignPassenger = require("./routes/users/foreign_passenger_route");
const getlocalusers=require("./routes/local_passenger/get_local_user_details");
const localpassengerinitialamount=require("./routes/local_passenger/initial_amount_payment");
const localpassengergetbalance=require("./routes/local_passenger/check_balance");
const forignpassengergetbalance=require("./routes/foreign_passenger/check_balance");
const viewjourneydetails=require("./routes/local_passenger/journey_details");
const updatexpiarydate=require("./routes/foreign_passenger/updatedate");
//db connection

mongoose.connect(
    "mongodb+srv://admin:admin123@cssetraindb-sqygr.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);


//use of dependencies
app.use(morgan("dev"));
app.use(bodyPorser.urlencoded({ extended: false }));
app.use(bodyPorser.json());
app.use(cors());





//use of routes
app.use("/train", train);
app.use("/addcredits", addcredits);
app.use("/extentexpiarydate",extendexpiredate);
app.use("/applyloan",applyloan);
app.use("/api", require("./routes/api/inspectors"));
app.use("/api", require("./routes/api/journeyDetails"));
app.use("/api", require("./routes/api/invalidjourneydetails"));
app.use("/api", require("./routes/api/fineinformation"));
app.use("/user", UserRoutes);
app.use("/manager", ManagerRoutes);
app.use("/localPassenger", LocalPassenger);
app.use("/foreignPassenger", ForeignPassenger);
app.use("/getlocalpassengers",getlocalusers);
app.use("/localinitialamount",localpassengerinitialamount);
app.use("/localpassengergetbalance",localpassengergetbalance);
app.use("/foreignpassengergetbalance",forignpassengergetbalance);
app.use("/journeydetails",viewjourneydetails);
app.use("/updatedate",updatexpiarydate);

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
