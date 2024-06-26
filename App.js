import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import RegisterationScreen from './screens/RegisterationScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




export default App = () => {
  const Stack = createNativeStackNavigator();
  
  return (
 
      <GestureHandlerRootView>
          <NavigationContainer >
              <Stack.Navigator>
                <Stack.Screen options={{ headerShown:false }} name="Registeration" component={RegisterationScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
              </Stack.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>
      

    
  );
}
const styles = StyleSheet.create({
 
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});