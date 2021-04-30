const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');
const account_model = require('./account_model');

const payment_model = new Schema({
        user: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        product: {
            type: Array,
            default: []
        }
    }
    ,
    {versionKey: false}
);

payment_model.plugin(timeZone);

module.exports = mongoose.model('payment', payment_model);