import { StyleSheet, Text, View, TextInput, Button,Alert } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";


const RegisterationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const navigation = useNavigation();

  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully!");
          
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      Alert.alert("Authentication Error", error.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <HomeScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? "Log In" : "Register"}</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button
              title={isLogin ? "Log In" : "Register"}
              onPress={handleAuthentication}
              color="#494EB6"
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text
              style={styles.toggleText}
              onPress={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Log In"}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color : "#494EB6",
    fontWeight:'500',
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#494EB6",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
});
