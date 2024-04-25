import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Footer from '../footer/Footer';

const Triggerrecommendation = () => {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [medData, setMedData] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const userid = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/recommendations/${userid}`);
      setUserId(userid);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/medicationfood`);
      setMedData(response.data);
    } catch (error) {
      console.error('Error fetching medication food data:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    fetchData();
  }, []);
  const generatePDF = async () => {
    try {
      let htmlContent = `
        <html>
          <head>
            <title>IBD Companion App</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            </style>
          </head>
          <body>
            <h1 style="text-align: center;">IBD Companion App</h1>
            <h2 style="text-align: center;">Recommendations:</h2>
            <table>
              <tr>
                <th>User ID</th>
                <th>Similarity</th>
                <th>Trigger Food</th>
                <th>Medication Name</th>
                <th>Dosages</th>
                <th>Frequency</th>
              </tr>
      `;
  
      recommendations.forEach((item) => {
        const userMedication = medData.find((medication) => parseInt(medication.username) === item.userId);
        htmlContent += `
              <tr>
                <td>${item.userId}</td>
                <td>${item.similarity}</td>
                <td>${userMedication ? userMedication.triggeredFood : '-'}</td>
                <td>${userMedication ? userMedication.name : '-'}</td>
                <td>${userMedication ? userMedication.dosage : '-'}</td>
                <td>${userMedication ? userMedication.frequency : '-'}</td>
              </tr>
        `;
      });
  
      htmlContent += `
            </table>
          </body>
        </html>
      `;
  
      const options = {
        html: htmlContent,
        fileName: 'IBD_Companion_App',
        directory: 'Documents',
      };
  
      const pdf = await RNHTMLtoPDF.convert(options);
      if (Platform.OS === 'ios') {
        Alert.alert('PDF Downloaded', pdf.filePath);
      } else {
        Alert.alert('PDF Downloaded', 'Check Documents folder');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  return (<>
 
      <View style={styles.header}>
        <Text style={styles.headerText}>User Analysis</Text>
      </View>
    <ScrollView horizontal>
      <View style={styles.container}>
        <Text style={styles.title}>Recommendation System</Text>
       
        <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
          <Text style={styles.pdfButtonText}>Download PDF</Text>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>User ID</Text>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>Similarity</Text>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>Trigger Food</Text>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>Medication</Text>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>Dosages</Text>
            <Text style={[styles.columnHeader, styles.fixedWidth]}>Frequency</Text>
          </View>
          {recommendations.map((item, index) => {
            const userMedication = medData.find(medication => parseInt(medication.username) === item.userId);
            return (
              <View key={index} style={styles.card}>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{item.userId}</Text>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{item.similarity}</Text>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{userMedication ? userMedication.triggeredFood : '-'}</Text>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{userMedication ? userMedication.name : '-'}</Text>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{userMedication ? userMedication.dosage : '-'}</Text>
                <Text style={[styles.cardItem, styles.fixedWidth]}>{userMedication ? userMedication.frequency : '-'}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
    <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color:'black'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pdfButton: {
    alignSelf: 'center',
    backgroundColor: 'blueviolet',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  pdfButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
  fixedWidth: {
    width: 120, // Adjust the width as needed
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
   

  },
  cardItem: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    color:'black'
  },
  
  header: {
    backgroundColor: 'blueviolet',
    padding: 10,
    height:70,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    top:10
  },
});

export default Triggerrecommendation;
