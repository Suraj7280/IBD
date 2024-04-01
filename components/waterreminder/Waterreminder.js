import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TextInput, Button } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../footer/Footer';

//two task is pending 1. username k according userId 2. for every new day new progress shown

const Waterreminder = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [waterIntakeData, setWaterIntakeData] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(20); // Default daily goal is 8 cups
  

  useEffect(() => {
    fetchWaterIntakeHistory();
  }, []);


  const logWaterIntake = async () => {
    if (!isNaN(parseFloat(amount)) && isFinite(amount)) {
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(amount), // Convert to a floating-point number
      };
      setWaterIntakeData(prevData => [...prevData, newEntry]);
      setAmount(''); // Clear the input field

      try {
        const userId = await AsyncStorage.getItem('username');
        await axios.post('http://10.0.2.2:3000/water-intake', { userId, amount: newEntry.amount, date: newEntry.date });
        fetchWaterIntakeHistory();
        
        
      } 
      catch (error) {
        console.error('Error logging water intake:', error);
      }
    } else {
      alert('Please enter a valid number for the amount.');
    }
  };

  const fetchWaterIntakeHistory = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/water-intake/'${userId}'`);
      setWaterIntakeData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching water intake data:', error);
    }
  };

  // Calculate total water intake for the day
  const totalIntake = waterIntakeData.reduce((total, entry) => total + entry.amount, 0);
  // Calculate the percentage of progress towards the goal
  const progress = totalIntake >= dailyGoal ? 100 : (totalIntake / dailyGoal) * 100;
  // Calculate the remaining amount to reach the goal
  const remaining = (dailyGoal - totalIntake)<=0?'Congratulations! You have reached your daily water intake goal ':dailyGoal - totalIntake;

  return (
    <View style={{ flex: 1}}>
                 <View style={styles.upperheader}>
                    <View style={styles.upperheadercontent}>
                    <View style={styles.username}>
                        
                        <Text style={styles.usernamestyles}>Water Intake Tracker</Text>
                       
                    </View>
                    </View>
               </View>
               <View style={{backgroundColor:'white',height:700}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 , padding: 20,height:110}}>
        <TextInput
          style={{ flex: 1, marginRight: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 ,color:'black'}}
          placeholder="Enter amount (in cups)"
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Button title="Log Intake" onPress={logWaterIntake} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 20 ,top:-40,}}>
        <Text style={{color:'black'}}>Daily Goal:</Text>
        <TextInput
          style={{ marginLeft: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5,color:'black' }}
          keyboardType="numeric"
          value={dailyGoal.toString()}
          onChangeText={text => setDailyGoal(parseInt(text))}
        />
        <Text style={{color:'black'}}> cups</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 10,top:-60 ,color:'black'}}>Progress:</Text>
        <ProgressCircle
          style={{ height: 200 ,width:200,top:-60}}
          progress={progress / 100}
          progressColor={'rgb(134, 65, 244)'}
          startAngle={-Math.PI * 0.8}
          endAngle={Math.PI * 0.8}
          strokeWidth={20}
        />
        <Text style={{ marginTop: 10,top:-60,color:'black' }}>Intake: {totalIntake} cups</Text>
        <Text style={{ top:-60,color:'black' }}>Remaining: {remaining} cups</Text>
      </View>
      </View>
      <Footer />
    </View>
  );
};


const styles = StyleSheet.create({
 
  upperheader:{
      backgroundColor: 'blueviolet',
      height:100
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
  
});

export default Waterreminder;

