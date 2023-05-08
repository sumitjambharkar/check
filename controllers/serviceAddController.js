const Service = require("../models/Service");

const addService = async (req, res) => {
  try {
    const { categorie,service,service_name,service_price,service_description,service_image} = req.body;
    const newService = new Service({
      categorie,
      service,
      service_name,
      service_price,
      service_description,
      service_image
    });
    await newService.save();
    res.status(200).json({ data: service });
  } catch (error) {
    console.log(error);
  }
};

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

const searchService = async (req,res) => {
  try {
    const result = await Service.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {des:{$regex:req.params.key}},
            {cost:{$regex:req.params.key}}
        ]
    });
    res.status(200).json({ data:result });
  } catch (error) {

  }
};

module.exports = {
  addService,
  updateService,
  showData,
  singalService,
  deleteService,
  searchService,
};
