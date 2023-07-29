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

router.get('/home-page',serviceAddRoute.homePage)
router.get('/category-page/:category',serviceAddRoute.categoryPage)
router.post('/add-service',serviceAddRoute.addService);
router.post('/admin-service',serviceAddRoute.adminservice)
router.get('/service-all',serviceAddRoute.showData)
router.put('/upadate-service/:id',serviceAddRoute.updateService);
router.get('/singal-service/:id',serviceAddRoute.singalService);
router.delete('/deleteService/:id',serviceAddRoute.deleteService)
router.get('/search/:key',serviceAddRoute.searchService)


module.exports = router