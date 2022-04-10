const User = require('../model/user')
const Parkingslot = require('../model/parkingslot')
const CustomError = require('../errors');

const { StatusCodes } = require('http-status-codes');
const parkvehical = async (req, res) => {
    const { parkingSlotname, vehicalNo, name, type_of_vehical } = req.body


    const no_of_available_slot = await Parkingslot.findOne({ parking_lot_name: parkingSlotname })
    //console.log("noofslot", no_of_available_slot)

    const quantityforcar = no_of_available_slot.no_of_SUVcar_slot
    const quantityforbike = no_of_available_slot.no_of_two_wheeler_slot
    const quantityforHatchback = no_of_available_slot.no_of_Hatchback_car_slot


    if (type_of_vehical == 'CAR') {
        console.log("zzzz")
        if (quantityforcar == 0) {
            console.log("insideif")
            throw new CustomError.BadRequestError('sloat not available plese choose diff parking slot ');
        }
        else {
            console.log("insideelse")
            await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_SUVcar_slot: quantityforcar - 1 }, { new: true })

        }
    }

    if (type_of_vehical == 'HATCHCAR') {
        if (quantityforHatchback == 0) {
            throw new CustomError.BadRequestError('sloat not available plese choose diff parking slot ');
        }
        else {
            await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_Hatchback_car_slot: quantityforHatchback - 1 }, { new: true })
        }
    }


    if (type_of_vehical == 'BIKE') {
        if (quantityforbike == 0) {
            throw new CustomError.BadRequestError('sloat not available plese choose diff parking slot ');
        }
        else {
            await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_two_wheeler_slot: quantityforbike - 1 }, { new: true })
        }
    }
    const parked = await User.create({ parkingSlotname, vehicalNo, name, type_of_vehical, entry: Date.now() })




    res.status(StatusCodes.CREATED).json({ parked })
}
//UNPARK VEHICAL

const Unparkvehical = async (req, res) => {
    const { parkingSlotname, vehicalNo, name } = req.body
    console.log(vehicalNo, parkingSlotname, name)
    const data = await User.findOne({ vehicalNo: vehicalNo })
    console.log("data", data)
    const type_of_vehical = data.type_of_vehical
    /////



    if (!data) {

        throw new CustomError.NotFoundError(`no vehical with this vehical number ${vehicalNo}`)
    }
    //parkingslot update
    const no_of_available_slot = await Parkingslot.findOne({ parking_lot_name: parkingSlotname })


    const quantityforcar = no_of_available_slot.no_of_SUVcar_slot
    const quantityforbike = no_of_available_slot.no_of_two_wheeler_slot
    const quantityforHatchback = no_of_available_slot.no_of_Hatchback_car_slot


    if (type_of_vehical == 'BIKE') {
        await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_two_wheeler_slot: quantityforbike + 1 }, { new: true })

    }
    if (type_of_vehical == 'CAR') {
        await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_SUVcar_slot: quantityforcar + 1 }, { new: true })

    }
    if (type_of_vehical == 'HATCHCAR') {
        await Parkingslot.findOneAndUpdate({ parking_lot_name: parkingSlotname }, { no_of_Hatchback_car_slot: quantityforHatchback + 1 }, { new: true })

    }
    //////
    const entry = Date.now() - data.entry
    const hour = entry / (1000 * 60 * 60)
    let fare = 0
    if (hour <= 2) {
        fare = hour * no_of_available_slot.price_for_first_2_hours
    }
    else {
        fare = ((hour - 2) * no_of_available_slot.price_after_2_hours) + (2 * no_of_available_slot.price_for_first_2_hours)
    }

    await User.findOneAndRemove({ vehicalNo: vehicalNo })

    res.status(StatusCodes.OK).json({ fare: fare, msg: `pay and then you can unpark your vehical` })



}
const getAllParkedVehical = async (req, res) => {
    const allVehical = await User.find({})
    res.status(StatusCodes.OK).json({ allVehical })
}
const getOneParkedVehical = async (req, res) => {
    const vehicalNo = req.params.id
    const detailsOne = await User.findOne({ vehicalNo: vehicalNo })
    if (!detailsOne) {
        throw new CustomError.NotFoundError(`no vehical with this vehical number ${vehicalNo}`)
    }
    res.status(StatusCodes.OK).json({ detailsOne })
}
module.exports = { parkvehical, Unparkvehical, getAllParkedVehical, getOneParkedVehical }
