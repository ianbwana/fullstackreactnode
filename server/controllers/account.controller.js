const db = require("../models");
const Account = db.account

const getAllAccounts = async(req, res) => {
    let accounts = await Account.findAll()
    res.status(200).send(accounts)
}


const getUserAccount = async(req, res) => {
    let id = req.params.id
    let userAccount = await Account.findOne({where: {user_id: id}, attributes: ['id', 'user_id', 'address']});
    res.status(200).send(userAccount)
}
module.exports = {getUserAccount, getAllAccounts}