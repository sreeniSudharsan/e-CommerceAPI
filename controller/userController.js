const getAllUsers= async(req, res)=> {
        res.json({mssg: "getAllUsers"})
};

const getSingleUser = async(req, res)=> {
    res.json({mssg: "getSingleUser route"})
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
