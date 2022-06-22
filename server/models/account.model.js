module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("accounts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
     return Account;
}