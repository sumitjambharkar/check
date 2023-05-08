const express = require('express')
const router = express()
const session = require('express-session')
const serviceAddRoute = require('../controllers/serviceAddController');
const auth = require('../middlewares/auth');

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure:true }
}))

router.post('/add-service',serviceAddRoute.addService);
router.get('/service-all',auth,serviceAddRoute.showData)
router.put('/upadate-service/:id',serviceAddRoute.updateService);
router.get('/singal-service/:id',serviceAddRoute.singalService);
router.delete('/deleteService/:id',auth,serviceAddRoute.deleteService)
router.get('/search/:key',serviceAddRoute.searchService)

module.exports = router