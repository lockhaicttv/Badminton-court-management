const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const court_model = require('./court_model');
const timeZone = require('mongoose-timezone')

const court_areas_model = new Schema(
    {
        area: {type: Number},
        status: {type: Boolean},
        description: {type: String},
        court_id: {type: Schema.Types.ObjectId, ref: court_model}
    },
    {versionKey: false}
)

court_areas_model.plugin(timeZone);
module.exports = mongoose.model('court_area', court_areas_model);