const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Types.ObjectId, required: true},
    user: { type: mongoose.Types.ObjectId, required: true},
    checkIn: { type: Date, required:true},
    checkOut: { type: Date, required: true},
    name: {type: String, required: true},
    telNum: {type: String, required: true},
    price: {type: Number, required: true},
})

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel