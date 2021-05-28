const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');
const court_area = require('../models/court_areas_models')


const court_booking_model = new Schema({
        booker_name: {type: String},
        start: {type: Date},
        end: {type: Date},
        phone_number: {type: String},
        description: {type: String},
        status: {type: Boolean},
        court_area_id: {type: Schema.Types.ObjectId, ref: court_area}
    },
    {versionKey: false}
)

court_booking_model.plugin(timeZone);
module.exports = mongoose.model('court_booking', court_booking_model);