const { parkvehical, Unparkvehical, getAllParkedVehical, getOneParkedVehical } = require('../controller/booking')
const express = require('express')
const router = express.Router()
router.route('/bookslot').post(parkvehical).delete(Unparkvehical).get(getAllParkedVehical)
router.route('/bookslot/:id').get(getOneParkedVehical)

module.exports = router