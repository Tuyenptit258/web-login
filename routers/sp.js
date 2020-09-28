const express = require('express')
const router = express.Router();


const spController = require('../controllers/spController')
router.get('/creat', spController.creat)
router.post('/store', spController.store)
router.get('/:slug', spController.show)

module.exports = router