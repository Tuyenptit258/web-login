const express = require('express')
const router = express.Router();


const mbController = require('../controllers/mbController')
router.get('/member', mbController.members)
router.post('/people', mbController.people)


module.exports = router