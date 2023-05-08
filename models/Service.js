const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  categorie: {
    type: String,
    require: true,
  },
  services: [
    {
      service_name: {
        type: String,
      },
      service_price: {
        type: Number,
      },
      service_image: {
        type: String,
      },
      service_description: {
        type: String,
      },
      serviceBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
});
module.exports = mongoose.model("Service", serviceSchema);
