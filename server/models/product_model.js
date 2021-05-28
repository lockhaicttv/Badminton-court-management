const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product_category = require('./product_category_model');
const promotion = require('../models/promotion_model')
const timeZone = require('mongoose-timezone');

const product_model = new Schema(
    {
        name: {type: String},
        price: {type: Number},
        description: {type: String},
        quantity: {type: Number},
        image: {
            base64: {type: String},
            name: {type: String},
            size: {type: String},
        },
        promotion_id: {type: Schema.Types.ObjectId, ref: promotion},
        product_category_id: {type: Schema.Types.ObjectId, ref: product_category},
        on_shop_page: {type: Boolean, default: false}
    },
    {versionKey: false}
);

product_model.plugin(timeZone);
module.exports = mongoose.model('product', product_model);