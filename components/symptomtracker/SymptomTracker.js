import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Footer from '../footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const SymptomTracker = ({navigation}) => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [description, setDescription] = useState('');
  const [showInput, setShowInput] = useState(false);


  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/symptom_diary/${username}`);
      setSymptoms(response.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const addSymptom = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await axios.post(`http://10.0.2.2:3000/symptom_diary`, {
        username,
        symptom: newSymptom,
        description,
        date: new Date().toISOString(),
      });
      setSymptoms([...symptoms, response.data]);
      setNewSymptom('');
      setDescription('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding symptom:', error);
    }
  };

  const deleteSymptom = async (index) => {
    try {
      const username = await AsyncStorage.getItem('username');
      await axios.delete(`http://10.0.2.2:3000/symptom_diary/${username}`);
      const updatedSymptoms = symptoms.filter((_, i) => i !== index);
      setSymptoms(updatedSymptoms);
    } catch (error) {
      console.error('Error deleting symptom:', error);
    }
  };

  return (
    <View style={styles.container}>
                <View style={styles.upperheader}>
                    <View style={styles.upperheadercontent}>
                    <View style={styles.username}>
                        
                        <Text style={styles.usernamestyles}>Symptoms Diary</Text>
                       
                    </View>
                    </View>
               </View>
      <ScrollView style={styles.symptomsContainer}>
        {symptoms.map((entry, index) => (
          <View key={index} style={styles.symptom}>
            <View style={styles.symptomHeader}>
              <Text style={styles.symptomHeaderText}>{entry.date}</Text>
              <Button title="Remove" onPress={() => deleteSymptom(index)} />
            </View>
            <Text style={styles.symptomText}>Symptom: {entry.symptom}</Text>
            <Text style={styles.symptomText}>Description: {entry.description}</Text>
          </View>
        ))}
      </ScrollView>
      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Symptom"
            value={newSymptom}
            onChangeText={setNewSymptom}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Button title="Add Symptom" onPress={addSymptom} />
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowInput(!showInput)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#f0f0f0',
    position: 'relative',
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  symptomsContainer: {
    marginBottom: 80,
    zIndex:-40
  },
  symptom: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  symptomHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  symptomText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    bottom:170
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  upperheader:{
    backgroundColor: 'blueviolet',
    height:110,
    bottom:10
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

export default SymptomTracker;
