const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = require('./account_model');
const timeZone = require('mongoose-timezone');

const product_category_model = new Schema({
        name: {type: String},
        account_id: {type: Schema.Types.ObjectId, ref: account}
    },
    {versionKey: false}
);

mongoose.plugin(timeZone);
module.exports = mongoose.model('product_category', product_category_model);