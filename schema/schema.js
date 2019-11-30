const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//ZODIAC SCHEMA
const ZodiacSchema = new Schema({

    sign_name : String,
    date_range :String,
    good_traits : [{
        trait : String
    }],
    bad_traits : [{
        trait : String
    }],
    famous_people:[{
        name :String
    }]

});

 
//EXPORTING MONGOOSE MODEL
module.exports = mongoose.model('Zodiac',ZodiacSchema);