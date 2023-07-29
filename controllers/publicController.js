const Book = require('../models/Book')

const bookService = async(req,res) => {
  try {
    const { name, email, mobile, address,location,services,city,pincode} = req.body;
    if (name&& email&& mobile&& address&&location&&services&&city&&pincode) {
      try {
        const doc = new Book({
          name: name,
          email: email,
          mobile: mobile,
          address:address,
          location:location,
          services:services,
          city:city,
          pincode:pincode
        });
        await doc.save();
        res.status(201).json({ message: "sucess" });
      } catch (error) {
        res.status(201).json({ message: "failed" });
      }
    } else {
      res.status(201).json({ message: "All fields are required" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {bookService};
  