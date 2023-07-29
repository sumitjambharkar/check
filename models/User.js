const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type: String,
        require : true
    },
    password : {
        type : String,
        require :true
    },
    mobile : {
        type : String,
        require : true
    },
    role : {
        type :String,
        default:'user'
    },
    address: {
        country:{
            type : String,
            require :true,
            default:""
        },
        state:{
            type : String,
            require :true,
            default:""
        },
        city: {
            type : String,
            require :true,
            default:""
        },
        location : {
            type : String,
            require :true,
            default:""
        },
        pincode : {
            type : String,
            require :true,
            default:""
        },
    },
    mobileOtp:{
        type : String,
        require :true,
        default:""
    },
    mobileVerified : {
        type : Boolean,
        default:false
    },
    token : {
        type : String,
    },
    createAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User',userSchema)