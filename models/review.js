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

ReviewSchema.statics.calculateAverageRating = async function(productId){
    const result = await this.aggregate([
        {
            $match: {
                product: new ObjectId(productId)
            }},

            {$groupBy:{
                    _id: null, averageRating:{$avg: '$rating'},
                    numofReviews: {$sum: 1},
                }} ,
    ])
    try {
        await this.model('Product').findOneAndUpdate({_id:productId},
            {
                averaageRating:Math.ceil.apply(result[0]?.averageRating || 0),
                numofReviews:result[0]?.numofReviews || 0
            })
    } catch (error) {
        console.log(error);

    }
}; //here statics refer to the static method since it does not depend on the model

ReviewSchema.post('save', async function() {
    await this.constructor.calculateAverageRating(this.product)
})

ReviewSchema.post('remove', async function() {
    await this.constructor.calculateAverageRating(this.product)
})


module.exports = mongoose.model('Reviews', ReviewSchema);

