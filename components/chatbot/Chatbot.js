import React, { useState, useEffect } from 'react';
import { View,  FlatList,Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Chatbot = () => {
  const [symptomData, setSymptomData] = useState('');
  const [foodData, setFoodData] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  console.log(symptomData)
  console.log(foodData)

  useEffect(() => {
    fetchData();
    fetchDataone();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      if (!userId) {
        Alert.alert('User ID not found');
        return;
      }
      const response = await axios.get(`http://10.0.2.2:3000/symptomschat/${userId}`);
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
      const response = await axios.get(`http://10.0.2.2:3000/foodchat/${userId}`);
      setFoodData(response.data);
    } catch (error) {
      console.error('Error fetching symptoms data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/process_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food_data: symptomData, symptom_data: foodData, prompt: prompt }),
      });
      const { processedData } = await response.json();
      setMessages(prevMessages => [...prevMessages, processedData]); // Add new message to existing messages
      setPrompt(''); // Clear input field after sending message
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again.');
    }
  };

 
    const data = [
      { id: '1', text: 'eat' },
      { id: '2', text: 'stool consistency' },
      { id: '3', text: 'symptoms' },
      { id: '4', text: 'pain while passing stool' },
      { id: '5', text: 'stool colour' },
      { id: '6', text: 'stool frequency' },
      { id: '7', text: 'mucous in stool' },
      { id: '8', text: 'blood in stool' },
      { id: '9', text: 'pain location' },
      { id: '10', text: 'food triggers' },
      { id: '11', text: 'dietary advice' },
    ];
  
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemtext}>{item.text}</Text>
      </View>
    );
  

  return (
    <>
    <View style={styles.header}>
          <Text style={styles.title}>ChatBot</Text>
        </View>
        <View style={styles.flatListContainer}>
          <Text style={{color:'black',left:5}}>Use These Keywords:</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>
        <View style={styles.container}>
       
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.chatBubble}>
            <Text>{message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={prompt}
          onChangeText={setPrompt}
        />
        <Button title="Send" onPress={handleSubmit} />
      </View>
    </View>
  
        </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
   
   

  },
  flatListContainer: {
    height: '8%',
    
  },
  chatBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  

  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  header: {
    backgroundColor: 'blueviolet',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  item:{
    top:5,
    marginLeft:5,
    backgroundColor:'blueviolet',
    height:25,
    width:200,
    borderRadius:5
  },
  itemtext:{
    color:'white',
    textAlign:'center'
  }
});

export default Chatbot;
