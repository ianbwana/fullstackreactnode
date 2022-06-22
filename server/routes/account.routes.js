const controller = require("../controllers/account.controller")

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });
    app.get('/api/v1/accounts', controller.getAllAccounts)
    app.get('/api/v1/users/:id/account', controller.getUserAccount)
}