const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const court = require('./court_model');
const timeZone = require('mongoose-timezone');

const product_category_model = new Schema({
        name: {type: String},
        court_id: {type: Schema.Types.ObjectId, ref: court}
    },
    {versionKey: false}
);

mongoose.plugin(timeZone);
module.exports = mongoose.model('product_category', product_category_model);