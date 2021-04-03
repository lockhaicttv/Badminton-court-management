const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user_model');
const timeZone = require('mongoose-timezone');

const user_bill_model = new Schema(
    {
        pay_time: {type: Date, default: new Date()},
        description: {type: String},
        price_total: {type: Number},
        status: {type: String, default: 'Chưa thanh toán'},
        user_id: {type: Schema.Types.ObjectId, ref: user}
    },
    {versionKey: false}
)

mongoose.plugin(timeZone);
module.exports = mongoose.model('user_bill', user_bill_model);

