const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type: String,
        require : true
    },
    mobile : {
        type : String,
        require : true
    },
    address: {
        type : String,
        require :true,
    },
    city: {
        type : String,
        require :true,
    },
    location : {
        type : String,
        require :true,
    },
    pincode : {
        type : String,
        require :true,
    },
    services : {
        type : String,
        require :true,
    },
    createAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Book',bookSchema)