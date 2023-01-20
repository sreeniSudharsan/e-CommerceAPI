const CustomError = require('../errors');
const user = require('../models/user');
const {isTokenValid} = require('../utils/jwt');

const authenticateUser = async(req, res, next)=> {
    const token = req.signedCookies.token

    if(!token){
     throw new CustomError.UnauthenticatedError('Authentication Invalid')   
    }

    try {
        const {name, userId, role} = isTokenValid({token});
        req.user = {name, userId, role};
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Auth Invalid!');
    }
}

const authorizePermissions = (...roles) => {
  return async(req, res, next) => {
    if(!roles.includes(req.user.role)){
        throw new CustomError.UnauthorizedError('Unauthorized to access this route');  
    }
    next();
  }
}

module.exports = {
    authenticateUser,
    authorizePermissions
};