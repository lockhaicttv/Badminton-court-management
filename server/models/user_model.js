const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const user_model = new Schema(
    {
        username: {type: String},
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

user_model.plugin(timeZone);

module.exports = mongoose.model("user", user_model);