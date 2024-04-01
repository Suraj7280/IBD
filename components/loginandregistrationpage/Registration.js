import React, { useState } from 'react';
import {View,Text,StyleSheet,Image,TextInput, Button, Alert,} from 'react-native';
import axios from 'axios';


const Registration= ({navigation}) =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [emailError, setEmailError] = useState('');
    const userData = { username, email };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    

    const handleRegister = () => {
        // Here you can implement your login logic
        //console.log('Username:', username);
        //console.log('Email:', email);
        //console.log('Password:', password);
        // Example: You can send a request to your backend to verify credentials

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
          }
          // Add your registration logic here
          console.log('Registering with email:', email);
        axios.post('http://10.0.2.2:3000/register', {username,email,password})
      .then(response => {
        if (response.status === 200) {
            navigation.navigate('Login');
            
            AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('registration successful');
          } else {
            setLoginFailed(true);
            Alert.alert('registration failed');
          }
      })
    
      .catch(error => console.error(error));
    };


    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.boxcontent}>
                    <Image
        source={require('../images/signup.png')} 
        style={{height: 170, width: 170,bottom:50}}
      />
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
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blueviolet',
      opacity:1,
      color:'white'
    },
    conte: {
        color:'white',
        top:20,
        fontSize:25
    },
    box:{
        height:450,
        width:310,
        
       
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
      },
    boxcontent:{
        justifyContent: 'center',
        alignItems: 'center',
        top:30
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color:'white',
        top:-70
      },
    loginbox:{
        top:-60,
        width:300
    },
    
});

export default Registration;