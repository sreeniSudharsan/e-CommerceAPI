const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
   name : {
    type:String,
    required: [true, 'Please provide product name'],
    maxlength: [50, 'Name cannot be more than 50 character']

},
    price: {
     type: Number,
     required: [true, 'Please provide product price'],
     default: 0
    },

    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description cannot be more than 300 characters']
    },

    image: {
        type: String,
        default: '/uploads/example.png',
        required: [true, 'Please provide product image']
    },
    category: {
        type: String,
        enum: ['office', 'kitchen', 'bedroom'],
        required: [true, 'Please provide product category']
    },
    company: {
        type: String,
        required: [true, 'Please provide product branch'],
        enum : {
            values: ['ikea', 'liddy', 'marcos'],
            message:'{VLAUE} is not supported'
        }
    },
    colors: {
        type: [String],
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: [true, 'Please provide product stock'],
        default: 15
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type:Number,
        default: 0
    },

    user: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps: true, toJSON: {virtuals:true}, toObject: {virutals: true}},
);

ProductScheme.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product', 
    justOne: false,
    // match:{rating:5}
})

ProductScheme.pre('remove', async function(){
    await this.model('Review').deleteMany({product:this._id}) 
})


module.exports = mongoose.model('Product', ProductScheme)