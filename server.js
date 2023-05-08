const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRouter')
const serviceAddRouters = require('./routes/serviceAddRoute');

app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://sumit:Sumitjambharkar@cluster0.tseta.mongodb.net/sundaymern?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection Database")
}).catch((error)=>{
    console.log(error);
})
app.use('/',userRoutes,serviceAddRouters)


app.listen(3001,()=>{
    console.log(`http://localhost:${3001}`);
})