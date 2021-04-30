const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');
const account_model = require('./account_model');

const court_model = new Schema(
    {
        name: {type: String},
        address: {type: String},
        phone_number: {type: Number},
        email_id: {type: String},
        website: {type: String},
        description: {type: String},
        logo: {
            name: {type: String},
            type: {type: String},
            size: {type: String},
            base64:{type: String}
        },
        banner: {
            name: {type: String},
            type: {type: String},
            size: {type: String},
            base64:{type: String}
        },
        court_total: {type: Number},
        account_id: {type: Schema.Types.ObjectId, ref: account_model}
    }
    ,
    {versionKey: false}
);

court_model.plugin(timeZone);

module.exports = mongoose.model('court', court_model);