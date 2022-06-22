// read env vars from .env file
require("dotenv").config();
const plaid = require("plaid");

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;

const plaidClient = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments.sandbox
})

module.exports = function (app) {
  app.post('/api/token_exchange', async (req, res) => {
    try{
    const public_token = req.body.public_token;
    const {access_token: accessToken} = await plaidClient.exchangePublicToken(public_token);
    // const authResponse = await plaidClient.getAuth(accessToken);
    // const identityResponse = await plaidClient.getIdentity(accessToken);
    const balanceResponse = await plaidClient.getBalance(accessToken);

    return res.status(201).send({
      // auth: authResponse,
      // identity: identityResponse,
      balance: balanceResponse
    })
  }catch(e){
    console.log(e)
    // res.status(500).send({
    //   message: e
    // })
  }
  })
  app.get("/api/create_link_token", async function (req, res, next) {

    try{
    
    const { link_token: linkToken} = await  plaidClient.createLinkToken({
      user: {
        client_user_id: 'exodustest-1'
      },
      client_name: 'exodustest',
      products: ['auth', 'identity'],
      country_codes: ['US', 'GB'],
      language: 'en',
    })

    res.json({linkToken})
  }catch(e){
    console.log(e)
  }
    
  });
};
