const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const account_model = new Schema(
    {
        username: {type: String, unique: true},
        password_1: {type: String},
        password_2: {type: String},
        full_name: {type: String},
        address: {type: String},
        phone_number: {type: Number},
        id_card: {type: Number},
        gender: {type: String},
        role: {type: String}
    },
    {versionKey: false}

);

account_model.plugin(timeZone);

module.exports = mongoose.model("account", account_model);