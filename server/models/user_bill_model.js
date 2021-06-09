const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user_model');
const court = require('./court_model')
const timeZone = require('mongoose-timezone');

const user_bill_model = new Schema(
    {
        pay_time: {type: Date, default: new Date()},
        description: {type: String},
        price_total: {type: Number},
        address: {type: String},
        status: {type: String, default: 'Chưa thanh toán'},
        user_id: {type: Schema.Types.ObjectId, ref: user},
        court_id: {type: Schema.Types.ObjectId, ref: court},
        payment_data: {type: Object}
    },
    {versionKey: false}
)

user_bill_model.plugin(timeZone);
module.exports = mongoose.model('user_bill', user_bill_model);

