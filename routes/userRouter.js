const express = require('express')
const router = express()
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth')


router.get('/home',auth,userController.home)
router.post('/register',userController.register)
router.put('/api/user-data',userController.getUserData)
router.post('/api/send-otp',userController.sendOtp)
router.post('/api/verify-otp',userController.verifyOtp)
router.post('/login',userController.login);
router.post('/forgot-password',userController.forgotPassword)
router.put('/reset-password/:id/:token',userController.resetPassword)



module.exports = router