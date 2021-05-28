const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('./product_model');
const user_bill = require('../models/user_model');
const timeZone = require('mongoose-timezone');

const user_bill_detail_model = new Schema(
    {
        quantity: {type: Number},
        user_bill_id: {type: Schema.Types.ObjectId, ref: user_bill},
        product_id: {type: Schema.Types.ObjectId, ref: product},
    },
    {versionKey: false}
)

user_bill_detail_model.plugin(timeZone);
module.exports = mongoose.model('user_bill_detail', user_bill_detail_model);
