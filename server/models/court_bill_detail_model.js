const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const court_bill = require('./court_bill_model');
const product_model = require('../models/product_model');
const timeZone = require('mongoose-timezone');

const court_bill_details_model = new Schema(
    {
        quantity: {type: Number},
        court_bill_id: {type: Schema.Types.ObjectId, ref: court_bill},
        product_id: {type: Schema.Types.ObjectId, ref: product_model},
    },
        {versionKey: false}
)

court_bill_details_model.plugin(timeZone);
module.exports = mongoose.model('court_bill_detail', court_bill_details_model);
// module.exports = mongoose.model('court_bill_detail', court_bill_details_model);