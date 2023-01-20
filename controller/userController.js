const User = require("../models/user");
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');


const getAllUsers= async(req, res)=> {
    const users = await User.find({role:'user'})
    res.status(StatusCodes.OK).json({ users});
};

const getSingleUser = async(req, res)=> {
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ user});
};

const showCurrentUser = async(req, res)=> {
    res.json({mssg: "showCurrentUser route"})
};

const updateUser = async(req, res)=> {
    res.json({mssg: "updateUserRoute"})
};

const updateUserPassword = async(req, res)=> {
    res.json({mssg: "udpateUserPassword Route"})
};


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} 
