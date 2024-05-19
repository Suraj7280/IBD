import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Graphs = () => {
  const [symptomData, setSymptomData] = useState('');
  const [foodData, setFoodData] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState('');
  console.log(username)


  useEffect(() => {
    fetchUsername();
    fetchData();
    fetchDataone();
    handleSubmit();
  }, []);
  
  const fetchUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        Alert.alert('Username not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };


  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
     
      if (!userId) {
        Alert.alert('User ID not found');
        return;
      }
      const response = await axios.get(`http://10.0.2.2:3000/symptoms/${userId}`);
      setSymptomData(response.data);
    } catch (error) {
      console.error('Error fetching symptoms data:', error);
    }
  };

  const fetchDataone = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      if (!userId) {
        Alert.alert('User ID not found');
        return;
      }
      const response = await axios.get(`http://10.0.2.2:3000/food/${userId}`);
      setFoodData(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleSubmit = async () => {
    try {        
      const response = await fetch('http://10.0.2.2:5000/trees_class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food_data: foodData, symptom_data: symptomData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // Parse response data as JSON
      setImageUri(responseData.image_uri);

    } catch (error) {
      console.error('Error:', error);
      console.log('Error', 'Failed to fetch data. Please try again.');
    }
  };
 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>Distribution of Stool Colors:</Text>
        <Image source={require(`../graphs/12.png`)} style={{ width: 400, height: 280 }} />

        <Text style={styles.text}>Distribution of Blood in Stool</Text>
        <Image source={require(`../bloodbar/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Correlation Matrix for Symptom Data</Text>
        <Image source={require(`../corr/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Stool Frequency Over Time</Text>
        <Image source={require(`../freqbar/12.png`)} style={{ width: 400, height: 250 }} />
        <Text style={styles.text}>Proportion of Different Food Items</Text>
        <Image source={require(`../mealpie/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Distribution of Stool Colors:</Text>
        <Image source={require(`../stoolbar/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Stool Consistency Over Time</Text>
        <Image source={require(`../stoolline/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Stool Consistency Over Time:</Text>
        <Image source={require(`../stressline/12.png`)} style={{ width: 400, height: 280 }} />
        <Text style={styles.text}>Scatter Plot: Stress vs. Water:</Text>
        <Image source={require(`../stressscater/12.png`)} style={{ width: 400, height: 280 }} />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default Graphs;
