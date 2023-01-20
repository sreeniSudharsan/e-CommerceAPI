const User = require("../models/user");
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser, attachCookies, checkPermissions} = require('../utils')

const getAllUsers= async(req, res)=> {
    const users = await User.find({role:'user'})
    res.status(StatusCodes.OK).json({ users});
};

const getSingleUser = async(req, res)=> {
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user});
};

const showCurrentUser = async(req, res)=> {
    res.status(StatusCodes.OK).json({user: req.user})
};

const updateUser = async(req, res)=> {
    const {email, name} = req.body;
    if(!email || !name){
        throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOneAndUpdate({_id:req.user.userId});

    user.email = email;
    user.name = name;

    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookies({res, user:tokenUser});
    res.status(StatusCodes.OK).json({user: tokenUser});

};

const updateUserPassword = async(req, res)=> {
   
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Please provide both new and old passwords!')
    }
    const user = await User.findOne({_id:req.user.userId});
    if (!user) {
        throw new CustomError.NotFoundError('User does not exist');
      }

    
    const OldCorrect = await user.comparePassword(oldPassword);
    if(!OldCorrect){
        throw new CustomError.UnauthenticatedError('Seems like the password you provided is wrong. Please try again!')
    }
    user.password = newPassword;

    await user.save(); //This is for updating the document, so that the password is still hashed in mongoDB
    res.status(StatusCodes.OK).json({msg:'Password has been changed successfully'})
};


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} 
