import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert
} from "react-native";
import styles from "./styles.js";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Loader from "./loader.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [user, setUser] = useState({})

  const onChangeEmail = (e) => {
    setEmail(e);
  };
  const onChangePassword = (e) => {
    setPassword(e);
  };

  useEffect(()=>{
      AsyncStorage.getItem("user", (err, result) => {
          if(result){
            // console.log(JSON.parse(result))
              setUser(JSON.parse(result))
              navigation.navigate("Profile")
          }else {
            console.log(err);
          }
      });
  }, [])
  const handleLogin = () => {
    setLoading(true);
    setLoadingText("Loading");
    let url = `https://exodustest.herokuapp.com/api/auth/login`;
    let data = {
      email: email,
      password: password,
    };

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
        let user =  JSON.stringify(res.data);
        AsyncStorage.setItem("user", user);
        
        navigation.navigate("Profile");
      })
      .catch((err) => {

        setLoading(false);
        
        Alert.alert(
          'Sorry',
          'We could not log you in. Please try again',
          [
            {
              text: 'Ok',
              onPress: () => {},
            }
          ],
          {cancelable: false},
        );
        console.log(err);
      });
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#5717f0",
        height: Dimensions.get("window").height,
      }}
    >
      <Loader loading={loading} content={loadingText} />
      <View style={[styles.viewContainer]}>
        <View style={{ flex: 4 }}></View>
        <View style={{ flex: 4 }}></View>
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
        <Text style={[styles.extraLargeText, {fontSize: 30, textAlign: "center"}]}>Welcome to your ExodusTest wallet</Text>
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
        <Text style={[styles.extraLargeText]}>Login</Text>
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
          style={styles.input}
          onChangeText={(e) => onChangeEmail(e)}
          value={email}
          placeholder="email"
          keyboardType="email-address"
          placeholderTextColor="#FFFFFF"
        />
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
          style={styles.input}
          onChangeText={(e) => onChangePassword(e)}
          value={password}
          secureTextEntry={true}
          placeholder="password"
          keyboardType="default"
          placeholderTextColor="#FFFFFF"
          onSubmitEditing={handleLogin}
        />
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
        <TouchableOpacity
          title="Log In"
          style={{
            width: "70%",
            backgroundColor: "#FFFFFF",
            borderRadius: 5,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          <Text
            style={[
              styles.normalText,
              {
                fontSize: 18,
                color: "#301934",
              },
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
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
        <Text style={[styles.normalText]}>Don't have an account yet?</Text>
        <Text
          style={[
            styles.normalText,
            { fontWeight: "600", textDecorationLine: "underline" },
          ]}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default Login;
