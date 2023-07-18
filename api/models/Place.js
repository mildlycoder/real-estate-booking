const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    desc: String,
    perks: [String],
    checkIn: String,
    checkOut: String,
    maxCap: String,
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

module.exports = PlaceModel;