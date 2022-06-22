module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        fee: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        transactionId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        timeSent:{
            type: Sequelize.DATE
        },
        timeReceived: {
            type: Sequelize.DATE
        },
        comment: {
            type: Sequelize.TEXT
        },
        to: {
            type: Sequelize.STRING
        }
    })

    return Transaction
}