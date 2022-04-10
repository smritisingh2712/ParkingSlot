
const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkingSpaceSchema = new Schema({
  parking_lot_name: {
    type: String,
    required: true,
    unique: true
  },
  no_of_two_wheeler_slot: {
    type: Number

  },
  no_of_SUVcar_slot: {
    type: Number

  },

  no_of_Hatchback_car_slot: {
    type: Number

  },
  price_for_first_2_hours: {
    type: Number,
    required: true
  },
  price_after_2_hours: {
    type: Number,
    required: true
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const ParkingSpace = mongoose.model('parking_spaces', parkingSpaceSchema);

module.exports = ParkingSpace;