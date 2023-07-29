const express = require('express');
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRouter')
const publicRoutes = require('./routes/publicRoute')
const serviceAddRouters = require('./routes/serviceAddRoute');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const Port = process.env.PORT || 4000
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const fileUpload = require('express-fileupload')
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config()

app.use(express.json())
app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    limits: { fileSize: 50 * 1024 * 1024 },
}));

Database()
app.use('/',userRoutes,serviceAddRouters,publicRoutes)



server.listen(Port,()=>{
    console.log(`http://localhost:${Port}`);
})