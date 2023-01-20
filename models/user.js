const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide name!!!'],
        maxlength: 20,
        minlength: 4
    },
    
    email:{
        type:String,
        unique: true, //this is not a validator, remember that!!!
        required: [true, 'Please provide email'],
        validate: {
            /*This is a custom validator taken as a package provided by npm which chceks 
            if the email is valid or not.
            For further info, check Mongoose Docs*/
            
            validator: validator.isEmail, 
            message: 'Please provide valid email'
        }

    },

    password:{
        type:String, 
        required: [true, 'Please provide password'],
        minlength: 6

    },
    role: {
       type: String,
       enum: ['admin', 'user'],
       default: 'user' 
    },
})

UserSchema.pre('save', async function(){
    console.log(this.modifiedPaths());
    console.log(this.isModified('name'));
    if (!this.isModified('password')) return; //Since we're calling the save hook on the update User controller. The pre-save is run one more time hashing the password once more
    const salt = await bcrypt.genSalt(10);    // Thus we're adding the above line in order to create a check if the password is being changed. If not, then we don't, then it just returns without changing the password
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; //this returns a bool type, comparing the candidate password and the the password that is passed
}

module.exports = mongoose.model('User', UserSchema);