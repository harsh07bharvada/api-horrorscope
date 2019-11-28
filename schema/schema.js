const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zodiacSchema = new Schema({
    sign_name : String,
    date_range : String,
    good_traits : [{
        trait : String
    }],
    bad_traits : [{
        trait : String
    }],
    famous_people : [{
        name : String
    }]
});

module.exports = mongoose.model('Zodiac',zodiacSchema);