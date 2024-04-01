import React, { useState } from 'react';
import {View,Text,StyleSheet,Image,TextInput, Button,TouchableOpacity ,Alert} from 'react-native';
import Registration from './Registration';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login= ({navigation,onLogin}) =>{
    
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
           // await AsyncStorage.setItem('isLoggedIn', 'true');
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


    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.boxcontent}>
                    
                    <Image
        source={require('../images/userlogin.png')} 
        style={{height: 170, width: 170,top:-10}}
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
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                        placeholderTextColor='white'
                    />
                    
                </View>
                
           </View>
           <View style={styles.forge}>
                       
                       <View>
                       <TouchableOpacity onPress={() => navigation.navigate(Registration)}>
                       <Text style={styles.sign}>SignUp?</Text>
                       </TouchableOpacity>
                       </View>
                       
                       <View>
                       <Text style={styles.forg}>Forget Password?</Text>
                       </View>
            </View>
            {loginFailed && <Text style={styles.errorText}>Login failed. Please try again.</Text>}
                   <View style={styles.loginbox}>
                      <Button title="Login"  onPress={handleLogin} />
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
    box:{
        height:450,
        width:310,
        
       
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
      },
    loginbox:{
        width:300,
        bottom:90,
    },
    forg:{
        color:'white',
        
        fontWeight:'bold',
        
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
      },
    
    forge:{
        display:'flex',
       flexDirection:'row',
       gap:130,
       bottom:120
    },
    sign:{
        color:'white',
        
    }
});

export default Login;