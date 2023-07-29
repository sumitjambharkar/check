const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  price: {
    type:String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createAt : {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model("Service", serviceSchema);
