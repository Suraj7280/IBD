import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../footer/Footer';


const Medication = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/medication/${username}`);
      // Reverse the order of medications
      setMedications(response.data.reverse());
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const addMedication = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const response = await axios.post('http://10.0.2.2:3000/medication', {
        username,
        name: newMedication,
        dosage,
        frequency,
        date: new Date().toISOString(),
      });
      // Add new entry at the top
      setMedications([response.data, ...medications]);
      setNewMedication('');
      setDosage('');
      setFrequency('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <>
      <View style={styles.upperheader}>
        <View style={styles.upperheadercontent}>
          <View style={styles.username}>
            <Text style={styles.usernamestyles}>Medication List</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.container}>
      <FlatList
          data={medications}
          renderItem={({ item }) => (
            <View style={styles.medication}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={{ color: 'white' }}>{`Dosages: ${item.dosage}`}</Text>
              <Text style={{ color: 'white' }}>{`Frequency: ${item.frequency}`}</Text>
              <Text style={{ color: 'white' }}>{`Date: ${item.date_added}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
         {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Medication"
            value={newMedication}
            onChangeText={setNewMedication}
            style={styles.input}
          />
          <TextInput
            placeholder="Dosage"
            value={dosage}
            onChangeText={setDosage}
            style={styles.input}
          />
          <TextInput
            placeholder="Frequency"
            value={frequency}
            onChangeText={setFrequency}
            style={styles.input}
          />
          <Button title="Add Medication" onPress={addMedication} />
        </View>
        )}
        <TouchableOpacity style={styles.addButton} onPress={() => setShowInput(!showInput)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
        {/* Render FlatList below input fields */}
       
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    flex:0.9
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
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
    bottom: 30,
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
  medication: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'blueviolet',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  upperheader: {
    backgroundColor: 'blueviolet',
    height: 100
  },
  upperheadercontent: {
    top: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  username: {
    left: 10
  },
  usernamestyle: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 25
  },
  usernamestyles: {
    color: 'white',
    fontSize: 20
  },
});

export default Medication;
