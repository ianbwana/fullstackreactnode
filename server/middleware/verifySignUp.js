const db = require("../models/index");
const User = db.user;


const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user)=>{
        if(user) {
            res.status(400).send({
                message: "That email is already in use"
            });
            return;
        }
        next();
    })
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;