const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('./product_model');
const promotion = require('./promotion_model')
const timeZone = require('mongoose-timezone');

const promotion_of_product_model = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: product},
    promotion_id: {type: Schema.Types.ObjectId, ref: promotion},
})

mongoose.plugin(timeZone);
module.exports = mongoose.model('promotion_of_product', promotion_of_product_model);