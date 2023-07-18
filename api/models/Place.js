const mongoose = require('mongoose')
const {Schema} = mongoose

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    desc: String,
    perks: [String],
    checkIn: Number,
    checkOut: Number,
    maxCap: Number,
})

const PlaceModel = mongoose.model('Place', PlaceSchema)

modules.export = PlaceModel