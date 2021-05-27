const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const message_model = new Schema(
    {
        message: {type: String},
        response: {type: String}
    },
    {versionKey: false}

);

message_model.plugin(timeZone);

module.exports = mongoose.model("message", message_model);