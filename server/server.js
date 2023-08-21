require('dotenv').config()
const express = require('express');
const cors = require('cors');
var request = require("request");

const app = express();

const corsOption = {
    origin: "*"
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");


db.sequelize.sync()


//Manual documentation for endpoints
app.get("/", (req, res) => {
    res.json({
      Intro:
        "Welcome to the exodus backend. No time for swagger docs, here are the endpoints 🙂",
      Routes: [
        {
          name: "auth",
          endpoint: "/api/auth/signup",
          description: "Endpoint for sign up",
          method: "post",
          data: {
            firstName: "string",
            lastName: "string",
            email: "string",
            password: "string",
          },
        },
        {
          name: "auth",
          endpoint: "/api/auth/login",
          description: "Endpoint for log in",
          method: "post",
          data: {
            email: "string",
            password: "string",
          },
        },
  
        {
          name: "user",
          endpoint: "/api/v1/users/:id",
          description: "Endpoint for a single user's details",
          method: "get",
        },
  
        {
          name: "user",
          endpoint: "/api/v1/users/",
          description: "Endpoint for all users",
          method: "get",
        },
  
        {
          name: "transactions",
          endpoint: "/api/v1/users/:id/transactions",
          description: "Endpoint for a single user's transactions",
          method: "get",
        },
  
        {
          name: "transactions",
          endpoint: "/api/v1/transactions",
          description: "Endpoint for all transactions",
          method: "get",
        },
  
        {
          name: "transactions",
          endpoint: "/api/v1/users/:id/transactions/total",
          description: "Endpoint for single users transaction total",
          method: "get",
        },
  
        {
          name: "plaid",
          endpoint: "/api/token_exchange",
          description:
            "Endpoint for exchanging plaid public token for the exchange token",
          method: "post",
          data: {
            public_token: "string",
          },
        },
  
        {
          name: "plaid",
          endpoint: "/api/create_link_token",
          description: "Endpoint for creating a plaid link token",
          method: "get",
        },
  
        {
          name: "bitcoin",
          endpoint: "/api/buy_bitcoin",
          description: "Endpoint for buying regtest bitcoins",
          method: "post",
          data: {
            user: "object",
            address: "string",
            amount: "integer",
          },
        },
  
        {
          name: "accounts",
          endpoint: "/api/v1/accounts",
          description: "Endpoint for getting all accounts",
          method: "get",
        },
  
        {
          name: "accounts",
          endpoint: "/api/v1/users/:id/account",
          description: "Endpoint for getting a single user's account",
          method: "get",
        },
      ],
    });
  });
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/plaid.routes")(app);
require("./routes/bitcoin.routes")(app);
require("./routes/account.routes")(app);
require("./routes/transaction.routes")(app)

const PORT  = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
});
