import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Analysis = () => {
  const [symptomData, setSymptomData] = useState('');
  const [foodData, setFoodData] = useState('');
  const [prompt, setPrompt] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await fetch('http://10.0.2.2:5000/trees_classifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food_data: foodData, symptom_data: symptomData}),
      });
      const { Food_trigger_score } = await response.json();
      setProcessedData(Food_trigger_score);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderProcessedData = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Food: {item.Feature}</Text>
      <Text style={styles.itemText}>Importance: {item.Importance}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        
        <Button title="Show Data" onPress={handleSubmit} disabled={isLoading} />
      </View>

      {processedData && (
        <FlatList
          data={processedData}
          renderItem={renderProcessedData}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  list: {
    flex: 1,
  },
});

export default Analysis;
