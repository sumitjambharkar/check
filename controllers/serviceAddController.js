const Service = require("../models/Service");
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "clennation",
  api_key: "171362321243793",
  api_secret: "0qTa9v3UcUJdNboehCWCDuv951Y"
});

const homePage = async (req, res) => {
  try {
    const uniqueCategories = await Service.aggregate([
      {
        $group: { _id: "$category", name: { $first: "$name" }, image: { $first: "$image", } }
      }
    ]);
    res.status(200).json(uniqueCategories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const categoryPage = async (req, res) => {
  const { category } = req.params;
  try {
    const uniqueCategories = await Service.aggregate([
      {
        $match: { category: category }
      }
    ]);
    res.status(200).json(uniqueCategories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



const addService = async (req, res) => {
  try {
    const { category,name,price,description,userId,mobile} = req.body;
    const file = req.files.image
    
    const result = await cloudinary.uploader.upload(file.tempFilePath)
    const newService = new Service({
      mobile,
      category,
      name,
      price,
      description,
      image:result.secure_url,
      userId:userId
    });
    await newService.save();
    res.status(200).json({ data:newService});
  } catch (error) {
    console.log(error);
  }
};

const adminservice = async (req,res)=> {
  try {
    const serviceData =await Service.find({userId:req.body.userId}).populate('userId')
    res.json({msge:"Success",serviceData})
  } catch (error) {
    res.json({msge:"error"})
  }
}

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Service.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    );
    res.status(200).json({ data: update });
  } catch (error) {
    console.log(error);
  }
};

const showData = async (req, res) => {
  try {
    if (!res.headersSent) {
    var data = await Service.find();
      res.status(200).json({ data: data });
    }
  } catch (error) {
    console.log(error);
  }
};

const singalService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({ _id: id });
    res.status(200).json({ data: service });
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.deleteOne({ _id: id });
    res.status(200).json({ data: service });
  } catch (error) {
    console.log(error);
  }
};

const searchService = async (req, res) => {
  try {
    const result = await Service.find({
      "$or": [
        { name: { $regex: req.params.key, $options: "i" } },
        { des: { $regex: req.params.key, $options: "i" } },
        { cost: { $regex: req.params.key, $options: "i" } }
      ]
    });
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  homePage,
  categoryPage,
  addService,
  updateService,
  showData,
  singalService,
  deleteService,
  searchService,
  adminservice
};
