import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import About from '../about/About';
import Footer from '../footer/Footer';


const Userprofile = ({ navigation, onLogout }) => {
  const [userdata, setUserData] = useState('');
  const [error, setError] = useState('');
  console.log(userdata);
  const [usernam, setUsernam] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsernam(storedUsername);
    };
    getUsername();
  }, []);

 

 

  useEffect(() => {
    const userData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const response = await axios.get(`http://10.0.2.2:3000/register/'${username}'`);
        
        setUserData(response.data[0]);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('User data not found.');
        } else {
          setError('Error fetching user data.');
        }
      }
    };
  
    userData();
  }, []);


  const { height } = Dimensions.get('window');
  return (
    <>
    <View>
      <View>
      <View style={styles.upperheader}>
        <Text style={styles.username}>User Profile</Text>
          </View>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
          <Image
                    source={require('../images/health1.png')} 
                    style={{height: 160, width: 160,top:12,left:100}}
                />
              
          
            <View style={{padding:10,height:height-260}}><View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userdata.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userdata.email}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(About)}>
      <View style={styles.row1}>
        <Text style={styles.label1}>About </Text>
        
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogout}>
      <View style={styles.row1}>
        <Text style={styles.label2}>Logout</Text>
       </View>
       </TouchableOpacity>
            
      </View>
      
          </>
        )}
    </View>
    
    </View>
    <View>
      <Footer />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  upperheader: {
    backgroundColor: 'blueviolet',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  username: {
    color: 'white',
    top: 1,
    fontSize: 25,
    fontWeight:'bold'
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    top:5,
  
    height:50,
    width:'100%',
    backgroundColor:'white',
    padding:10
  
  },
  row1: {
    flexDirection: 'row',
    marginBottom: 10,
    top:5,
    height:50,
    
   
    width:'100%',
    backgroundColor:'white',
    padding:10
  
  },
  label: {
    width: 100,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize:20,
    color:'black'

  },
  label1: {
    width: 100,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize:20,
    color:'blue',
   
    

  },
  label2: {
    width: 100,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize:20,
    color:'red'

  },
  value: {
    flex: 1,
    fontSize:20
  },
});

export default Userprofile;