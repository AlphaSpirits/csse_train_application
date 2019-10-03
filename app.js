const express = require ('express');
const app=express();
const morgan=require('morgan');
const bodyPorser=require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Importing routes
const train = require("./routes/admin/trains");
const UserRoutes = require("./routes/users/user_route");

//db connection
// mongoose.connect(
//     "mongodb+srv://tharuka:tharuka12345@afprojectstartsmart-ycawy.mongodb.net/test?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true
//     }
//   );

/*
mongoose.connect(
    "mongodb://localhost/csse_1",

    {
      useNewUrlParser: true
    }
  );
*/

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
app.use("/api", require("./routes/api/inspectors"));
app.use("/api", require("./routes/api/journeyDetails"));
app.use("/api", require("./routes/api/invalidjourneydetails"));
app.use("/user", UserRoutes);

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
