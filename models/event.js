const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({

    rollno:{
        type:Number,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    maths: {
        type: String,
        // required: true
    },
    science:{
        type: String,
        // required: true
    },
    english:{
        type: String,
        // required: true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }


});

module.exports = mongoose.model('Marksheet', eventSchema);