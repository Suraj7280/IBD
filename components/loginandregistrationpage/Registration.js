import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

const Registration = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // const handleRegister = () => {
    //     if (!validateEmail(email)) {
    //         setEmailError('Invalid email address');
    //         return;
    //     }

    //     // Add your registration logic here
    //     console.log('Registering with email:', email);
    //     axios.post('http://10.0.2.2:3000/register', { username, email, password })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 navigation.navigate('Login');
    //                 Alert.alert('Registration successful');
    //             } else {
    //                 setLoginFailed(true);
    //                 Alert.alert('Registration failed');
    //             }
    //         })
    //         .catch(error => console.error(error));
    // };

    const handleRegister = async () => {
      if (!validateEmail(email)) {
          setEmailError('Invalid email address');
          return;
      }
  
      try {
          const response = await axios.get(`http://10.0.2.2:3000/checkUser?username=${username}&email=${email}`);
          if (response.data.exists) {
              Alert.alert('Data already exist in database');
          } else {
              // Add your registration logic here
              console.log('Registering with email:', email);
              await axios.post('http://10.0.2.2:3000/register', { username, email, password });
              navigation.navigate('Login');
              Alert.alert('Registration successful');
          }
      } catch (error) {
          console.error(error);
          Alert.alert('Registration failed');
      }
  };
  

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.boxcontent}>
                    {/* <Image
                        source={require('../images/signup.png')}
                        style={styles.logo}
                    /> */}
                    <Text style={styles.title}>Create an Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={setUsername}
                        value={username}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        placeholderTextColor='white'
                    />
                    {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor='white'
                    />
                    {loginFailed && <Text style={styles.errorText}>Registration failed. Please try again.</Text>}
                    <View style={styles.loginbox}>
                        <Button title="Register" onPress={handleRegister} />
                    </View>
                </View>
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
   
    boxcontent: {
        alignItems: 'center',
    },
    logo: {
        height: hp('15%'),
        width: wp('30%'),
        marginBottom: hp('2%'),
    },
    title: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
        color: 'white',
        marginBottom: hp('2%'),
    },
    subtitle: {
        fontSize: wp('4%'),
        color: 'white',
        marginBottom: hp('5%'),
    },
    input: {
        width: wp('70%'),
        height: hp('5%'),
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
        paddingHorizontal: wp('3%'),
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: hp('2%'),
    },
    loginbox: {
        width: wp('70%'),
    },
});

export default Registration;
