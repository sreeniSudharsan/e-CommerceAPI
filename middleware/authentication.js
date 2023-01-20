const CustomError = require('../errors');
const {isTokenValid} = require('../utils/jwt');

const authenticateUser = async(req, res, next)=> {
    const token = req.signedCookies.token

    if(!token){
        console.log('error, no token present');
    }
    console.log('token present');
    next();
}

module.exports = authenticateUser;