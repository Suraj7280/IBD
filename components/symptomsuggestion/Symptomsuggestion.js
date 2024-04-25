import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../footer/Footer';

const Symptomsuggestion = () => {
  const [healthData, setHealthData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  console.log(healthData)

  useEffect(() => {
    // Fetch user's latest health data from backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const userId = await AsyncStorage.getItem('username');
        
      const response = await axios.get(`http://10.0.2.2:3000/symptomsuggestion/${userId}`);
     
      setHealthData(response.data);
      // Process latest health data and generate suggestions
      generateSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching latest health data:', error);
    }
  };

  const generateSuggestions = (healthData) => {
    const firstData = healthData[0];
    
    const suggestions = [];
  
    // Stool Consistency
    if (firstData.stoolConsistency < 2) {
      
      suggestions.push('Your stool consistency is low. Try increasing your fiber intake and drinking more water.');
    } else if (firstData.stoolConsistency >= 3) {
      suggestions.push('Your stool consistency is high. Make sure to stay hydrated and consider adding more fruits and vegetables to your diet.');
    }
  
    // Pain Passing Stool
    if (firstData.painPassingStool === 1) {
      suggestions.push('You are experiencing pain passing stool. It could be a sign of constipation or other digestive issues. Consider increasing your fiber intake and consult a doctor if the pain persists.');
    }
  
    // Stool Color
    if (firstData.stoolColor === 'black') {
      suggestions.push('Black stool can indicate bleeding in the upper gastrointestinal tract. It is important to seek medical attention promptly.');
    } else if (healthData.stoolColor !== 'brown') {
      suggestions.push('Abnormal stool color may indicate digestive issues. Consider consulting a doctor for further evaluation.');
    }
  
    // Stool Frequency
    if (firstData.stoolFrequency < 1) {
      suggestions.push('You are not having regular bowel movements. Ensure you are consuming enough fiber and staying hydrated.');
    }
  
    // Mucous in Stool
    if (firstData.mucousInStool === 1) {
      suggestions.push('The presence of mucus in stool can indicate inflammation or infection in the digestive tract. Consult a doctor for further evaluation.');
    }
  
    // Blood in Stool
    if (firstData.bloodInStool === 1) {
      suggestions.push('Blood in stool can be a sign of serious gastrointestinal issues. Seek immediate medical attention.');
    }
  
    // Pain Location
    if (firstData.painLocation === 'abdomen') {
      suggestions.push('Abdominal pain can have various causes, including digestive issues. Monitor your symptoms and consider consulting a doctor if the pain persists or worsens.');
    }
  
    // Fever
    if (firstData.fever === 1) {
      suggestions.push('Fever can be a sign of infection or inflammation. Rest, stay hydrated, and consider consulting a doctor if the fever persists or is accompanied by other symptoms.');
    }
  
    // Nausea
    if (firstData.nausea === 1) {
      suggestions.push('Nausea can have many causes, including digestive issues or infections. Consider eating bland foods and staying hydrated. If nausea persists, consult a doctor.');
    }
  
    // Flatulence
    if (firstData.flatulence === 1) {
      suggestions.push('Excessive flatulence can be caused by various factors, including diet and digestive issues. Consider keeping a food diary and consulting a doctor if symptoms persist.');
    }
  
    setSuggestions(suggestions);
  };
  
  return (
    <>
    <View style={styles.header}>
        <Text style={styles.headerText}>Health Suggestion</Text>
      </View>
    <View style={styles.container}>
      
      {suggestions ? (
        <ScrollView>
            <View style={styles.symcontent}>
          <Text style={styles.subtitle}>Based on your health data:</Text>
          {suggestions.map((suggestion, index) => (
            <View style={styles.contentbox}><Text key={index} style={styles.suggestion}>{`${index + 1}. ${suggestion}`}</Text>
                </View>
            
          ))}
        </View>
        </ScrollView>
        
      ) : (
        <Text>Loading suggestions...</Text>
      )}
    </View>
    <Footer />
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
  marginBottom:150
   
  },
  header: {
    backgroundColor: 'blueviolet',
    padding: 10,
    height: 70,
   
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    top: 10,
  },
 
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
   
    padding:10,
    backgroundColor:'white'
  },
  suggestion: {
    fontSize: 16,
    bottom: 15,
    color:'black'
  },
  contentbox:{
    padding:10,
    backgroundColor:'white'
  }
});

export default Symptomsuggestion;
