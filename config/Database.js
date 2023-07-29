const mongoose = require('mongoose');
const Database = () => {
  mongoose
    .connect(
      process.env.MONGO_DB,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("connection Database");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = Database;
