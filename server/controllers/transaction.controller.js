const db = require("../models")
const User = db.user
const Transaction = db.transaction;
const Sequelize = require('sequelize')
const getAllTransactions = async(req, res) => {
    let transactions = await Transaction.findAll()
    res.status(200).send(transactions)
}

const getUserTransactions = async(req, res) => {
    let id = req.params.id
    let userTransactions = await Transaction.findAll({where: {user_id: id}, attributes: [
        'id', 
        'amount', 
        'fee',
        'transactionId',
        
    ]});
    res.status(200).send(userTransactions)
}

const getTotal = async (req, res) => {
    let id = req.params.id;
    let transactionTotal = await Transaction.findAll({
        where: {user_id: id},
        attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
        raw: true,
    })

    res.status(200).send(transactionTotal)
}

module.exports = {
    getAllTransactions,
    getUserTransactions, 
    getTotal
}