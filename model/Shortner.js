const mongoose = require('mongoose');

const shortnerSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        trim: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    ClickMatrics: [],
    status:{
        type: String,
        enum: ['active','inactive','removed']
    }

}, { timestamps: true });

const URL = mongoose.model('shortner', shortnerSchema )

module.exports={
    URL
}