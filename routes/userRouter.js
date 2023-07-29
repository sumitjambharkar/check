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
router.put('/api/user-data',userController.getUserData)
router.post('/api/send-otp',userController.sendOtp)
router.post('/api/verify-otp',userController.verifyOtp)
router.post('/login',userController.login);
router.post('/forgot-password',userController.forgotPassword)
router.put('/reset-password/:id/:token',userController.resetPassword)



module.exports = router