const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number, 
            min: 1,
            max: 5, 
            required: [true, 'Please Provide Rating']
        },
        title: {
            type:String,
            trim:true,  
            maxlength: 20,
            required: [true, 'Please Provide Title']
        },
        comment: {
            type:String,
            trim:true,  
            maxlength: 200
        },
        user: {
            type:mongoose.Schema.ObjectId, 
            ref: 'User',
            required: true
        },

        product: {
            type:mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        }

    },
    {
        timestamps:true
    }
);

ReviewSchema.index( { product: 1, user: 1}, {unique: true});


module.exports = mongoose.model('Reviews', ReviewSchema);

