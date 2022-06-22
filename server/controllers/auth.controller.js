const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Account = db.account;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.regtest;
const keypair = bitcoin.ECPair.makeRandom({network})
const pubkey = keypair.publicKey
const addressObj = bitcoin.payments.p2pkh({pubkey, network})
var address = addressObj.address



exports.signup = (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then((user)=> {
        Account.create({
            address: address,
            user_id: user.id,
        }).then((account) => {
            res.status(201).send({ message: `User was registered successfully with address ${account.address}` });}).catch(err=>{
                res.status(500).send({ message: err.message });
            })
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    })
}

exports.login = (req, res) => {
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user=>{
        if(!user){
            res.status(404).send({
                message: "User not found"
            })
        }

        var passwordValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordValid){
            res.status(401).send({
                accessToken: null,
                message: "Invalid Email/Password"
            })
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: token
          });
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })

    })
}