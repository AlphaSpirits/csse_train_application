const express = require ('express');
const app=express();
const morgan=require('morgan');
const bodyPorser=require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//calling routes
const train = require("./routes/admin/trains");

//db connection
// mongoose.connect(
//     "mongodb+srv://tharuka:tharuka12345@afprojectstartsmart-ycawy.mongodb.net/test?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true
//     }
//   );

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

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  module.exports = app;
