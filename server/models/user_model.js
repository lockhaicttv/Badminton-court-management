const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const user_model = new Schema(
    {
        username: {type: String, unique: true},
        password: {type: String},
        full_name: {type: String},
        address: {type: String},
        phone_number: {type: Number},
        id_card: {type: Number},
        gender: {type: String},
        birthday: {type: Date, default: new Date()}
    },
    {versionKey: false}

);

user_model.plugin(timeZone);

module.exports = mongoose.model("user", user_model);