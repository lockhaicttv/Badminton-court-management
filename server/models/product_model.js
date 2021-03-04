const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product_category = require('./product_category_model');
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
        product_category_id: {type: Schema.Types.ObjectId, ref: product_category}
    },
    {versionKey: false}
);

mongoose.plugin(timeZone);
module.exports = mongoose.model('product', product_model);