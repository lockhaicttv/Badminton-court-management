const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const promotion_model = new Schema({
    name: {type: String},
    start: {type: Date},
    end: {type: Date},
    value: {type: Number},
    description: {type: String}
},
    {versionKey: false}
)

mongoose.plugin(timeZone);
module.exports = mongoose.model('promotion', promotion_model);