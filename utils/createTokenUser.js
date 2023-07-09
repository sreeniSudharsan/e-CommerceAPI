// Creates a JSON web token to be sent along for the user.
const createTokenUser = (user) => {
    return {name:user.name, id: user._id, role:user.role} 
}


module.exports = createTokenUser;
