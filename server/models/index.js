const config =  require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.development.url);
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.user = require("../models/user.model")(sequelize, Sequelize); 
  db.account = require("../models/account.model")(sequelize, Sequelize);
  db.transaction = require("./transactions.model")(sequelize,Sequelize)

  db.user.hasOne(db.account, {
    foreignKey: 'user_id',
    as: 'account'
})

db.account.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: 'user'
})

db.user.hasMany(db.transaction,{
  foreignKey: 'user_id',
  as: 'transaction'
})

db.transaction.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: 'user'
})

module.exports = db;