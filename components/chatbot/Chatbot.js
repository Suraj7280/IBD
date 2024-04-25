import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Chatbot = () => {
  const [symptomData, setSymptomData] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      if (!userId) {
        Alert.alert('User ID not found');
        return;
      }
      const response = await axios.get(`http://10.0.2.2:3000/medicationfood/${userId}`);
      setSymptomData(response.data);
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
        body: JSON.stringify({ food_data: symptomData[0]?.breakfast, symptom_data: symptomData[0]?.name, prompt: prompt }),
      });
      const { processedData } = await response.json();
      setMessages(prevMessages => [...prevMessages, processedData]); // Add new message to existing messages
      setPrompt(''); // Clear input field after sending message
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again.');
    }
  };

  return (
    <>
    <View style={styles.header}>
          <Text style={styles.title}>ChatBot</Text>
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
});

export default Chatbot;
