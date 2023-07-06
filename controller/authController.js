const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookies, createTokenUser} = require('../utils');



//REGISTER CONTROLLER
const register = async(req, res) => {
    const {email, name, password} = req.body;

    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already Exists!');
    }

    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount? 'admin': 'user';
    
    const user = await User.create({name, email, password, role}); /*this destructuring as name, email and password makes sure that none can add the admin role to  the req.body*/ 
    const tokenUser = createTokenUser(user)    
    attachCookies({res, user:tokenUser}) //For more clarity, check the jwt.js in utils folder
 
  //  res.status(StatusCodes.CREATED).json({ user:user}); 

};



//LOGIN CONTROLLER


const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Please Provide Email and Password!');
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new CustomError.UnauthenticatedError('User does not exist by this email')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const tokenUser = createTokenUser(user);
    attachCookies({res, user:tokenUser})

    res.status(StatusCodes.OK).json({user: tokenUser})

};


//LOGOUT ROUTE


const logout = async(req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true, 
        expires: new Date(Date.now() /*+ 2 * 1000*/)
    });
    res.status(StatusCodes.OK).json({msg: 'User Logged Out!'})
    
};


module.exports = {register, login, logout}