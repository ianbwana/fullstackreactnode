const Client = require("bitcoin-core");
const client = new Client({
  network: "regtest",
  host: "localhost",
  timeout: 30000,
  port: 8332,
  username: process.env.RPC_USER,
  password: process.env.RPC_PASSWORD,
});
const db = require("../models");
const Transaction = db.transaction;

module.exports = function (app) {
  app.post("/api/buy_bitcoin", async (req, res) => {
    try {
      let address = req.body.address;
      let amount = req.body.amount;
      let user = req.body.user;
      let username = `${user.firstName} ${user.lastName}`;
      let id = user.id;
      client
        .sendToAddress(
          address,
          amount,
          "Bought from exodustest",
          `${user.firstName} ${user.lastName}`,
          true,
          true,
          null,
          "unset",
          null,
          1.1
        )
        .then((txn) => {
          client
            .getTransaction(`${txn}`)
            .then((details) => {
              Transaction.create({
                amount: details.amount,
                fee: details.fee,
                transactionId: details.txid,
                timeSent: details.time,
                timeReceived: details.timereceived,
                comment: details.comment,
                to: username,
                user_id: id,
              }).then((res) => {
                  });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
      return res.status(200).send({ message: "success" });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  });
};
