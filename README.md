## ExodusTest


## Description
Exodustest is a simple btc wallet that allows users to create an account, log in, link a bank account through plaid's sandbox api and purchase bitcoin on a regtest network hosted and configured on the user's computer. The app has a backend built using Node, Express and Postgres managed by [ElephantSQL](https://www.elephantsql.com/) and a mobile client built using React Native for Android.

#### Requirements
1. [NodeJS](https://nodejs.org/en/)
2. [Postgres](https://www.postgresql.org/download/)
3. [Express](https://virtualenv.pypa.io/en/stable/installation/)
4. [React Native](https://reactnative.dev/)

#### Clone the Repo and enter the project folder.
```bash
git clone https://github.com/ExodusMovementInterviews/Ian-Bwana.git
```
#### Move into the cloned directory and type the following commands
```bash
cd server && npm install && npm start
```

The server will start running on localhost port 5000 i.e 'localhost:5000' or '127.0.0.1:5000'

#### once finished, type...
```bash
cd ../client && npm install 
```
## CLIENT
For the client application which is built using react native, you need to run it on an emulator or a physical device. You might need to change the endpoints to your-ip-address:5000 e.g '192.168.1.1:5000'

If you have have your android development setup running well, add the 'local.properties' file to your android folder with the path to your android SDK.
You can then run 
```bash
react-native run-android 
```

For ios, run 
```bash
react-native run-ios
```

A backend demo hosted on heroku can be found [here](https://exodustest.herokuapp.com/) where the landing page is a json response of all the endpoints and their data. 
A test apk can also be found [here](https://drive.google.com/file/d/1M-Gs6QEni-j966Lp1i4uTHZFaIHZsFZ9/view?usp=sharing).

A screen recording demonstrating the app use can be found [here](https://drive.google.com/file/d/1QvGWK5_WqYD-cXTUZ3RSBEdRbntJ45fu/view?usp=sharing).


