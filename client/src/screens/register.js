import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert, 
  KeyboardAvoidingView,
  Platform
} from "react-native";
import styles from "./styles.js";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Loader from "./loader.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  const onChangeFirstName = (e) => {
    setFirstName(e);
  };

  const onChangeLastName = (e) => {
    setLastName(e);
  };

  const onChangeEmail = (e) => {
    setEmail(e);
  };
  const onChangePassword = (e) => {
    setPassword(e);
  };

  const handleLogin = (email, password) => {
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
        navigation.navigate('Profile')
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  


  const handleSignUp = () => {
    setLoading(true);
    setLoadingText("Loading");
    let url = `https://exodustest.herokuapp.com/api/auth/signup`;
    let data = {
        firstName: firstName,
        lastName: lastName,
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
        console.log(res.data);
        setLoading(false);
        
        Alert.alert(
            'Congratulations',
            'You have successfully signed up!',
            [
              {
                  text: "Ok",
                  onPress: () => {
                      handleLogin(email, password)
                  }
              }
            ],
            {cancelable: false},
          );
      })
      .catch((err) => {
        setLoading(false);

        
        Alert.alert(
          'Sorry',
          'We could not sign you up. Please try again',
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
        // justifyContent: "center",
        backgroundColor: "#5717f0",
        height: Dimensions.get("window").height,
      }}
    >
      <Loader loading={loading} content={loadingText} />
      <View style={[styles.viewContainer, { width: "100%"}]}>
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}
        style={{ 
            flex: 6, 
            padding: 10, 
            display: "flex", 
            justifyContent: "flex-start", 
            alignItems: "flex-start"}}
            >
        <MaterialIcons name="keyboard-arrow-left" size={36} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 6 }}></View>
      </View>
      <KeyboardAvoidingView 
      style={[styles.viewContainer,
          { justifyContent: "flex-start",
            flexDirection: "column",
            marginTop: 30,
            flex: 1
          },]}>
      <View
        style={[
          styles.viewContainer,
          {
            flexDirection: "column",
            marginTop: 30,
          },
        ]}
      >
        <Text
          style={[styles.extraLargeText, { fontSize: 30, textAlign: "center" }]}
        >
          Welcome to your ExodusTest wallet
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
        <Text style={[styles.extraLargeText]}>Sign Up</Text>
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
          onChangeText={(e) => onChangeFirstName(e)}
          value={firstName}
          placeholder="First Name"
          keyboardType="default"
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
          onChangeText={(e) => onChangeLastName(e)}
          value={lastName}
          placeholder="Last Name"
          keyboardType="default"
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
          onPress={handleSignUp}
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
            Register
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
