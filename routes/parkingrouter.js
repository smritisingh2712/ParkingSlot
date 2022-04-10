const { createParkingSloat, getAllParkingSlot } = require('../controller/parkingslot')
const express = require('express')
const router = express.Router()
router.route('/createslot').post(createParkingSloat).get(getAllParkingSlot)

module.exports = router