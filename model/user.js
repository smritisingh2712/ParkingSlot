const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    parkingSlotname: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    vehicalNo: {
        type: String,
        require: true,
        unique: [true, "a vehical number always be unique"]
    },
    entry: {
        type: Date
    },
    type_of_vehical: {
        type: String,
        required: [true, 'Please provide vehical type'],
        enum: {
            values: ['CAR', 'HATCHCAR', 'BIKE'],
            message: '{VALUE} is not supported'
        }

    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;