const controller = require("../controllers/transaction.controller")

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });
    app.get('/api/v1/users/:id/transactions',controller.getUserTransactions);
    app.get('/api/v1/transactions', controller.getAllTransactions)
    app.get('/api/v1/users/:id/transactions/total', controller.getTotal)
}