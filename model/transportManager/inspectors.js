const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create inspectors schema and model
const InspectorsScehma = new Schema({
  usertype: {
    type: String,
    required: [true, "User Type field is required"]
  },
  username: {
    type: String,
    required: [true, "Username field is required"]
  },
  password: {
    type: String,
    required: [true, "Password field is required"]
  },
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  emailaddress: {
    type: String,
    required: [true, "Email address field is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone field is required"]
  }
});

const Inspectors = mongoose.model("inspectors", InspectorsScehma);

module.exports = Inspectors;
