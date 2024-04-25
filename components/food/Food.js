import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,  ScrollView ,Button,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../footer/Footer';


const Food = ({navigation}) => {
 

 
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');
  const [water, setWater] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [triggeredFood, setTriggeredFood] = useState('');


  const [error, setError] = useState('');



  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };
    getUsername();
  }, []);

  const handleFormSubmit = async () => {
    if (!username || !date || !breakfast || !lunch || !dinner || !snacks || !water || !stressLevel || !triggeredFood) {
        Alert.alert('Error', 'Please fill in all details.');
        return;
      }
    const formData = {
   
     username,
      date,
      breakfast,
      lunch,
      dinner,
      snacks,
      water,
      stressLevel,
      triggeredFood
    };

    console.log('Form Data:', formData);
   // Implement API call to send formData to the backend
    fetch('http://10.0.2.2:3000/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Form data submitted:', data);
        // Reset form after successful submission
       setDate('')
       setBreakfast('')
       setDinner('')
       setLunch('')
       setSnacks('')
       setStressLevel('')
       setWater('')
       setUsername('')
       setTriggeredFood('')
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
   });


      


  };

 
  
  

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fill Food Details</Text>
      </View>
      <ScrollView style={{flex:0.4}}>
      <View style={{padding:2,}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Formate:MM/DD/YYYY"
        value={date}
        onChangeText={setDate}
      />
     </View>
      </View>
      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Breakfast</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter breakfast details"
        value={breakfast}
        onChangeText={setBreakfast}
      />
     </View>
      </View>
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Lunch</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter lunch details"
        value={lunch}
        onChangeText={setLunch}
      />
     </View>
      </View>
     
      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Dinner</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dinner details"
        value={dinner}
        onChangeText={setDinner}
      />
     </View>
      </View>
     
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Snacks</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter snacks details"
        value={snacks}
        onChangeText={setSnacks}
      />
     </View>
      </View>

      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Water Intake (ml)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter water intake in ml"
        value={water}
        onChangeText={setWater}
      />
     </View>
      </View>

      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Stress Level (1-10)</Text>
      <TextInput
        placeholder="Enter stress level (1-10)"
        value={stressLevel}
        onChangeText={setStressLevel}
        style={styles.input}
        keyboardType="numeric"
      />
     
     </View>
     
     </View>

     <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Triggered Food</Text>
      <TextInput
        style={styles.input}
        placeholder="Triggered Food"
        value={triggeredFood}
        onChangeText={setTriggeredFood}
      />
     </View>
      </View>
      
     
     
      <Button title="Submit" onPress={handleFormSubmit} />
      
    </ScrollView>
   
    <View style={{flex:0.13}}>
       <Footer />
    </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  dateconstainer:{
    alignItems:'center',
    
    top:0,
    height:90,
    //borderTopEndRadius:50,
    //borderBottomStartRadius:50, 
    
 
  },
  textdesign:{
    top:5,
    fontSize:20,
    color:'black',
    
   
  },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
      top:6,
      backgroundColor:'white'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
      },
      header: {
        height: 70,
        backgroundColor: 'blueviolet',
        justifyContent: 'center',
        
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',
        left:20
      },
      error:{
        color:'red'
      }
  });
  
  export default Food;