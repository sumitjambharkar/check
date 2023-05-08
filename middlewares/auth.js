const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = async (req, res, next) => {
  
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(' ')[1]
        jwt.verify(token,config.secret_jwt,(err,valid)=>{
         if (err) {
            res.status(200).json({message:"Please Provide Token"});
         }else{
            next()
         }
        });
    }else{
        res.status(200).json({message:"please add token"});
    }
};

module.exports = auth;
