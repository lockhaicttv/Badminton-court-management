const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const court_area = require('./court_areas_models');
const timeZone = require('mongoose-timezone');

const court_bill_model = new Schema(
    {
        time_check_in: {type: Date},
        time_check_out: {type: Date},
        status: {type: Boolean},
        price_total: {type: Number},
        court_area_id: {type: Schema.Types.ObjectId, ref: court_area}
    },
        {versionKey: false}
)

court_bill_model.plugin(timeZone);
module.exports = mongoose.model('court_bill', court_bill_model);

