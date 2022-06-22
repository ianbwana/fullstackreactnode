const db = require("../models");
const User = db.user

const getUser = async (req, res) => {
    let user = await User.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['firstName', 'lastName', 'email']
    })
    res.status(200).send(user)
}

const getAllUsers = async(req, res) => {
    let users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email']
    })

    res.status(200).send(users)
}

module.exports = { 
    getUser,
    getAllUsers
}