import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TriggeredItems = () => {

    const [userData, setUserData] = useState({
        User_ID: '',
        Spicy_Foods: 0,
        Raw_Vegetables: 0,
        Dairy_Products: 0,
        High_Fiber_Foods: 0,
        Alcohol: 0,
        Processed_Foods: 0,
        Nuts: 0,
        Fried_Foods: 0
      });
    
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const username = await AsyncStorage.getItem('username');
            setUserData(prevState => ({ ...prevState, User_ID: username }));
           
          } catch (error) {
            console.error('Error fetching username from AsyncStorage:', error);
          }
        };
        fetchUserData();
      }, []);
    
      const handleOptionSelect = (field, value) => {
        setUserData({ ...userData, [field]: value });
      };
      console.log(userData)
    
      const sendDataToBackend = async () => {
        try {
          const response = await axios.post('http://10.0.2.2:3000/trigger_data', userData);
          Alert.alert('Data Submited')
          console.log('Data sent successfully:', response.data);
        } catch (error) {
          console.error('Error sending data to backend:', error);
        }
      };
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Triggered Items Collection</Text>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Spicy Foods</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Spicy_Foods === 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Spicy_Foods', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Spicy_Foods === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Spicy_Foods', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Raw Vegetables</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Raw_Vegetables === 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Raw_Vegetables', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Raw_Vegetables === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Raw_Vegetables', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Dairy Products</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Dairy_Products === 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Dairy_Products', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Dairy_Products === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Dairy_Products', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>High Fiber Foods</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.High_Fiber_Foods=== 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('High_Fiber_Foods', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.High_Fiber_Foods === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('High_Fiber_Foods', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Alcohol</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Alcohol=== 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Alcohol', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Alcohol === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Alcohol', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Processed Foods</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Processed_Foods=== 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Processed_Foods', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Processed_Foods === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Processed_Foods', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Nuts</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Nuts=== 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Nuts', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Nuts === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Nuts', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Fried Foods</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, userData.Fried_Foods=== 1 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Fried_Foods', 1)}
          >
            <Text style={styles.optionButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, userData.Fried_Foods === 0 && styles.selectedOption]}
            onPress={() => handleOptionSelect('Fried_Foods', 0)}
          >
            <Text style={styles.optionButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={sendDataToBackend}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    marginRight: 10,
    flex: 1,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default TriggeredItems;
