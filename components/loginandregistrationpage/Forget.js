import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const Forget = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.user) {
          setShowPrompt(true); // Show the password prompt
        } else {
          Alert.alert('Error', 'User not found for the provided username and email.');
        }
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleSavePassword = async (password) => {
    setShowPrompt(false); // Hide the password prompt
    try {
      // Send request to update password
      const updateResponse = await fetch('http://10.0.2.2:3000/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const updateData = await updateResponse.json();
      if (updateResponse.ok) {
        Alert.alert('Success', 'Password updated successfully');
      } else {
        Alert.alert('Error', updateData.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'An error occurred while updating password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Button title="Reset Password" onPress={handleResetPassword} />
        {showPrompt && (
          <TextInput
            placeholder="New Password"
            onChangeText={text => setNewPassword(text)}
            style={styles.input}
            secureTextEntry={true}
          />
        )}
        {showPrompt && (
          <Button title="Save" onPress={() => handleSavePassword(newPassword)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
});

export default Forget;
