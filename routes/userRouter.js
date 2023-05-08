const express = require('express')
const router = express()
const session = require('express-session')
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth')


router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false }
}))


router.get('/home',auth,userController.home)
router.post('/register',userController.register)
router.post('/login',userController.login);



module.exports = router