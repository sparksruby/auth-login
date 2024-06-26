import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from './firebase'; // Adjust the path if necessary

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Registration Successful', 'You have successfully registered.');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        Alert.alert('Registration Failed', error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleSignUp} />
    </View>
  );
}

export default RegisterScreen;
