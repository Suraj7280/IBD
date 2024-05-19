import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Registration from './Registration';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Forget from './Forget';

const Login = ({ navigation, onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const response = await axios.post('http://10.0.2.2:3000/login', { username, password });
      if (response.status === 200) {
        await AsyncStorage.setItem('username', username);
        onLogin();
        Alert.alert('Login successful');
      } else {
        setLoginFailed(true);
        Alert.alert('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../images/userlogin.png')}
        style={styles.logo}
      /> */}
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholderTextColor='white'
        />
        {loginFailed && <Text style={styles.errorText}>Login failed. Please try again.</Text>}
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate(Registration)}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Forget)}>
          <Text style={styles.link}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blueviolet',
  },
  logo: {
    width: wp('40%'), // Adjust the logo size dynamically
    height: wp('40%'),
    marginBottom: hp('5%'), // Adjust spacing dynamically
  },
  inputContainer: {
    width: wp('80%'), // Adjust the container width dynamically
  },
  title: {
    fontSize: hp('4%'), // Adjust title font size dynamically
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('1%'), // Adjust spacing dynamically
  },
  subtitle: {
    fontSize: hp('2%'), // Adjust subtitle font size dynamically
    color: 'white',
    marginBottom: hp('3%'), // Adjust spacing dynamically
  },
  input: {
    height: hp('5%'), // Adjust input height dynamically
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp('2%'), // Adjust border radius dynamically
    paddingHorizontal: wp('3%'), // Adjust padding dynamically
    marginBottom: hp('2%'), // Adjust spacing dynamically
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: hp('2%'), // Adjust spacing dynamically
  },
  link: {
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: hp('2%'), // Adjust spacing dynamically
  },
});

export default Login;
