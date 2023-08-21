import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import styles from "./styles.js";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "./loader.js";

import { PlaidLink } from "react-native-plaid-link-sdk";

const Dashboard = ({ navigation }) => {
  const [user, setUser] = useState(AsyncStorage.getItem("user"));
  const [linkToken, setLinkToken] = useState("");
  const [plaidAccount, setPlaidAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const [accountData, setAccountData] = useState({});
  const [balance, setBalance] = useState(0);
  const [btcAddress, setBtcAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getBtcAddress();

    let user = AsyncStorage.getItem("user", (err, result) => {
      if (result) {
        setUser(JSON.parse(result));
        AsyncStorage.getItem("plaidUserAccount", (err, result) => {
          if (result) {
            setPlaidAccount(JSON.parse(result));
          }

          createLinkToken();
          getBtcAddress();
        });
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const tokenExchange = (publicToken) => {
    setLoading(true);
    setLoadingText("Performing token exchange..");
    let data = {
      public_token: publicToken,
    };
    let url = `https://exodustest.herokuapp.com/api/token_exchange`;
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 90000,
      data: data,
    })
      .then((res) => {
        let balance = res.data.balance.accounts[0].balances.available;
        setBalance(balance);
        setLoading(false);
        setAccountData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("x", err);
      });
  };

  const renderPlaid = () => {
    try {
      return (
        <View
          style={[
            styles.viewContainer,
            { backgroundColor: "#301934", padding: 10, marginTop: 30 },
          ]}
        >
          <PlaidLink
            tokenConfig={{ environment: "sandbox", token: linkToken }}
            onSuccess={(success) => {
              Alert.alert(
                "Congratulations",
                `You have successfully linked to your ${success.metadata.institution.name} account`,
                [
                  {
                    text: "Ok",
                    onPress: () => {
                      getBtcAddress();
                    },
                  },
                ],
                { cancelable: false }
              );
              let result = success;
              setPublicToken(result.publicToken);
              tokenExchange(result.publicToken);
              setPlaidAccount(result.metadata);
              AsyncStorage.setItem(
                "plaidUserAccount",
                JSON.stringify(result.metadata)
              );
            }}
            onExit={(exit) => console.log(exit)}
          >
            <Text style={[styles.largeText]}>Add Account</Text>
          </PlaidLink>
        </View>
      );
    } catch (e) {
      console.log("1,", e);
    }
  };
  const getBtcAddress = () => {
    let url = `https://exodustest.herokuapp.com/api/v1/users/${user.id}/account`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 90000,
      // data: data,
    })
      .then((res) => {
        setLoading(false);
        setBtcAddress(res.data.address);
      })
      .catch((err) => {
        setLoading(false);
        console.log("2", err.message);
      });
  };

  const buyBitcoin = () => {
    setAmount("")
    setModalVisible(false)
    let data = {
      address: btcAddress,
      amount: amount,
      user: user,
    };
    setLoading(true);
    setLoadingText("Initiating transaction...");
    let url = `http://localhots:5000/api/buy_bitcoin`;
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 90000,
      data: data,
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("2", err.message);
      });
  };

  const createLinkToken = () => {
    setLoading(true);
    setLoadingText("Fetching token for plaid...");
    let url = `https://exodustest.herokuapp.com/api/create_link_token`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 90000,
      // data: data,
    })
      .then((res) => {
        setLoading(false);
        setLinkToken(res.data.linkToken);
      })
      .catch((err) => {
        setLoading(false);
        console.log("3", err);
      });
  };
  const onChangeAmount = (e) => {
    setAmount(e);
  };
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#301934",
          height: 70,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Loader loading={loading} content={loadingText} />
        <View style={{ flex: 4 }}></View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: 24,
              color: "#FFFFFF",
            }}
          >
            ExodusTest
          </Text>
        </View>
        <View style={{ flex: 4 }}></View>
      </View>
      <View
        style={[
          styles.viewContainer,
          {
            flexDirection: "column",
            marginTop: 30,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
        ]}
      >
        <Text
          style={[
            styles.extraLargeText,
            { color: "black", textTransform: "capitalize" },
          ]}
        >
          Welcome, {user.firstName}
        </Text>
      </View>
      {linkToken === "" ? null : renderPlaid()}
      <View
        style={[
          styles.viewContainer,
          { justifyContent: "space-between", marginTop: 40 },
        ]}
      >
        <View style={[styles.financialInfo]}>
          <Text
            style={[styles.largeText, { width: "80%", textAlign: "center" }]}
          >
            {" "}
            {"Your" + " "}
            <Text style={[styles.largeText, { color: "yellow" }]}>
              {plaidAccount &&
              plaidAccount.institution &&
              plaidAccount.institution.name
                ? plaidAccount.institution.name
                : ""}
            </Text>
            {" " + "Account"}
          </Text>
          <Text
            style={[styles.largeText, { width: "80%", textAlign: "center" }]}
          >
            Balance is
          </Text>
          <Text style={[styles.extraLargeText]}>{balance}</Text>
        </View>

        <View style={[styles.financialInfo]}>
          <View style={[styles.financialInfo]}>
            <Text
              style={[styles.largeText, { width: "80%", textAlign: "center" }]}
            >
              Your BTC
            </Text>
            <Text
              style={[styles.largeText, { width: "80%", textAlign: "center" }]}
            >
              Balance
            </Text>
            <Text style={[styles.extraLargeText]}>0</Text>
          </View>
        </View>
      </View>
      {btcAddress === "" ? null : (
        <View>
          <View
            style={[
              styles.viewContainer,
              {
                flexDirection: "column",
                marginTop: 40,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Text style={[styles.normalText, { color: "black", fontSize: 11 }]}>
              Your BTC address
            </Text>
          </View>
          <View
            style={[
              styles.viewContainer,
              {
                height: 45,
                width: "90%",
                backgroundColor: "#666666",
                marginTop: 5,
                padding: 10,
              },
            ]}
          >
            <Text style={[styles.normalText]}>{btcAddress}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          btcAddress === ""
            ? Alert.alert(
                "Sorry",
                `Your BTC address has not been loaded. Press OK to reload`,
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                  {
                    text: "Ok",
                    onPress: () => {
                      getBtcAddress();
                    },
                  },
                ],
                { cancelable: true }
              )
            : balance === 0
            ? Alert.alert(
                "Sorry",
                `Your Balance is insufficient. Link another bank account or re-establish your link`,
                [
                  {
                    text: "Ok",
                    onPress: () => {},
                  },
                ],
                { cancelable: true }
              )
            : setModalVisible(true);
        }}
        style={[
          styles.viewContainer,
          {
            height: 45,
            width: "90%",
            backgroundColor: "green",
            marginTop: 40,
          },
        ]}
      >
        <Text style={[styles.largeText]}>Buy BTC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={[
          styles.viewContainer,
          {
            height: 45,
            width: "90%",
            backgroundColor: "black",
            marginTop: 40,
          },
        ]}
      >
        <Text style={[styles.largeText]}>Logout</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType={"none"}
        visible={modalVisible}
        onRequestClose={() => {}}
        style={{
          zIndex: 9999,
          elevation: 10,
          position: "absolute",
        }}
      >
        <View activeOpacity={1} style={styles.modal_outer_background}>
          <View style={[styles.modal_background, { borderRadius: 5 }]}>
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 5 }}>
              <TouchableOpacity
                style={styles.cancel_button}
                onPress={() => {
                  setAmount("")
                  setModalVisible(false);
                }}
              >
                <AntDesign name="closecircle" size={24} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  // textAlign: 'center',
                  margin: 40,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontFamily: "Circular-Std",
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#312B2B",
                  textAlign: "center"
                }}
              >
                How many bitcoins do you want to buy?
              </Text>
            </View>
            <View
              style={[
                styles.viewContainer,
                {
                  flexDirection: "column",
                  marginTop: 30,
                },
              ]}
            >
              <TextInput
                style={[styles.input, {
                  borderWidth: 2, 
                  borderColor: "#301934", 
                  textAlign: "center", 
                  color: "#301934", 
                  fontSize: 20,
                  fontWeight:"600"
                }]}
                onChangeText={(e) => onChangeAmount(e)}
                value={amount}
                placeholder="00.00"
                keyboardType="numeric"
                placeholderTextColor="#301934"
              />
            </View>
            <View
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                padding: 20,
                borderRadius: 5,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    // flex: 1,
                    backgroundColor: "#808080",
                  },
                ]}
                onPress={() => {
                  setAmount(0);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "Circular-Std",
                    fontSize: 14,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: "green",
                  },
                ]}
                onPress={() => {
                  amount === 0
                    ? Alert.alert(
                        "Sorry",
                        `The amount must be 0.1 or more`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => {},
                          },
                          {
                            text: "Ok",
                            onPress: () => {},
                          },
                        ],
                        { cancelable: true }
                      )
                    : buyBitcoin();
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "Circular-Std",
                    fontSize: 14,
                  }}
                >
                  PROCEED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;
