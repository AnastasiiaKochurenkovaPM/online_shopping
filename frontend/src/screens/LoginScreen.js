import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from "react-native";
import React, { useState,useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import { Alert } from "react-native";




  
const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {

      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { screen: 'Профіль' } }],
        });
      }

        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

            } catch (err) {
                console.log("error message", err);
            }
            };
            checkLoginStatus();
    }, [user]);

    const handleLogin = () => {
        const user = {
        email: email,
        password: password,
        };

          axios
          .post("http://10.0.2.2:5000/api/auth/login", user)
          .then((response) => {
            const token = response.data.token;
            const userData = response.data.user;
        
            AsyncStorage.setItem("accessToken", token);
            dispatch(setUser(userData));
        
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Home', params: { screen: 'Каталог' } }],
            // });
          })
          .catch((error) => {
            console.log("Login error:", error);
            let errorMessage = "Something went wrong. Please try again.";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            Alert.alert("Login Error", errorMessage);
          });
    };


    return (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "white", alignItems: "center",marginTop:50 }}
        >
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{
                uri: "https://www.google.com/imgres?q=shopy&imgurl=https%3A%2F%2Fcdn.theorg.com%2F2bd5fdd5-40de-4b46-8f0e-0e8c622ab528_medium.jpg&imgrefurl=https%3A%2F%2Ftheorg.com%2Forg%2Fshopy&docid=OnyFigiWBmWwBM&tbnid=ll_e7Rka-OOoSM&vet=12ahUKEwiG3OrQw9eMAxWVgP0HHVfbMDUQM3oECEkQAA..i&w=750&h=750&hcb=2&ved=2ahUKEwiG3OrQw9eMAxWVgP0HHVfbMDUQM3oECEkQAA",
              }}
            />
          </View>
    
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                }}
              >
                Login In to your Account
              </Text>
            </View>
    
            <View style={{ marginTop: 70 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="gray"
                />
    
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 16 : 16,
                  }}
                  placeholder="enter your Email"
                />
              </View>
            </View>
    
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <AntDesign
                  name="lock1"
                  size={24}
                  color="gray"
                  style={{ marginLeft: 8 }}
                />
    
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 16 : 16,
                  }}
                  placeholder="enter your Password" 
                />
              </View>
            </View>
    
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text></Text>
    
              <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                
              </Text>
            </View>
    
            <View style={{ marginTop: 80 }} />
    
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#0f5813",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
    
            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 15 }}
            >
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})