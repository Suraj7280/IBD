import React,{ useEffect, useState } from 'react';
import {View,Text,StyleSheet, Button,TouchableOpacity,Image, ScrollView} from 'react-native';
import Footer from '../footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Waterreminder from '../waterreminder/Waterreminder';
import SymptomTracker from '../symptomtracker/SymptomTracker';
import Meal from '../meal/Meal';
import Medication from '../medication/Medication';





const Home= ({navigation}) =>{
 const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };
    getUsername();
  }, []);

    
    return(
        <View style={styles.container}>
            <View style={{flex: .8}}>
                <View style={styles.upperheader}>
                    <View style={styles.upperheadercontent}>
                    <View style={styles.username}>
                        <Text style={styles.usernamestyle}>Hello {username}!</Text>
                        <Text style={styles.usernamestyles}>Welcome to the Journey</Text>
                        {/*<Button title="Logout" onPress={handleLogout} />*/}
                    </View>
                    </View>
               </View>
            <View style={styles.lowerheader}>
            <Text style={styles.features}>Features</Text>
                <View style={styles.featurecontainer}>
                <TouchableOpacity onPress={() => navigation.navigate(Waterreminder)}>
                    <View style={styles.featurebox}>
                    <Image
                    source={require('../images/water.png')} 
                    style={{height: 160, width: 160,top:12}}
                />
                <Text style={{color:'white',top:-25,fontWeight:'bold',backgroundColor:'black',textAlign:'center'}}>Water Intake Tracker</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate(SymptomTracker)}>
                    <View style={styles.featurebox}>
                    <Image
                    source={require('../images/diary.png')} 
                    style={{height: 145, width: 145,top:20,left:12}}
                />
                <Text style={{color:'white',top:-10,fontWeight:'bold',backgroundColor:'black',textAlign:'center'}}>Symptom Diary</Text>
                    </View>
                    </TouchableOpacity>
                    
                </View>
                <View>
                    <Text></Text>
                </View>
                
                <View style={styles.featurecontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate(Meal)}>
                    <View style={styles.featurebox}>
                    <Image
                    source={require('../images/tips.png')} 
                    style={{height: 150, width: 150,top:15,left:0}}
                />
                <Text style={{color:'white',top:-15,fontWeight:'bold',backgroundColor:'black',textAlign:'center'}}>IBD Tips Screen</Text>
                    </View></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(Medication)}>
                    <View style={styles.featurebox}>
                    <Image
                    source={require('../images/pills.png')} 
                    style={{height: 150, width: 150,top:15,left:0}}
                />
                <Text style={{color:'white',top:-15,fontWeight:'bold',backgroundColor:'black',textAlign:'center'}}>Medication List</Text>
                    </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
           </View>
           <Footer />
        </View>
    )
}
// git branch -m main IbdFrontend
// git fetch origin
// git branch -u origin/IbdFrontend IbdFrontend
// git remote set-head origin -a

const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'white',
     flex:1
    },
    upperheader:{
        backgroundColor: 'blueviolet',
        height:180
    },
    upperheadercontent:{
        top:40,
        display:'flex',
        flexDirection:'row',
    },
    username:{
       left:10
    },
    usernamestyle:{
        color:'white',
        fontWeight:"bold",
        fontSize:25
    },
    usernamestyles:{
        color:'white',
        fontSize:20
    },
    features:{
        color:'black',
        fontWeight:"bold",
        fontSize:22,
        padding:30

    },
    lowerheader:{
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        top:-25,
        backgroundColor:'white',  
        width:'100%' 
    },
    featurecontainer:{
        display:'flex',
        flexDirection:'row',
        gap:20,
        justifyContent:'center',
        top:0
    },
    featurebox:{
        backgroundColor:'blueviolet',
        height:170,
        width:150,
        borderRadius:20
    }
    
});

export default Home;