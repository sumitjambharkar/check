const express = require('express')
const router = express()
const publicController = require('../controllers/publicController');

router.post('/book-service',publicController.bookService)

module.exports = router