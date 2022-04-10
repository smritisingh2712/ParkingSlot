const Parkingslot = require('../model/parkingslot')
const { StatusCodes } = require('http-status-codes');

const createParkingSloat = async (req, res) => {
    const { parking_lot_name,
        no_of_two_wheeler_slot,
        no_of_SUVcar_slot,

        no_of_Hatchback_car_slot,

        price_for_first_2_hours,
        price_after_2_hours,
    } = req.body

    const parkingslot = await Parkingslot.create({
        parking_lot_name,
        no_of_two_wheeler_slot,
        no_of_SUVcar_slot,

        no_of_Hatchback_car_slot,

        price_for_first_2_hours,
        price_after_2_hours
    })
    res.status(StatusCodes.CREATED).json({ parkingslot })


}
const getAllParkingSlot = async (req, res) => {
    const slot = await Parkingslot.find({})
    res.status(StatusCodes.OK).json({ slot })
}
module.exports = { createParkingSloat, getAllParkingSlot }