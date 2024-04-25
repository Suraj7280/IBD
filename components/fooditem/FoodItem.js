import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Footer from '../footer/Footer';

const FoodItem = ({ navigation }) => {
  const [symptomsData, setSymptomsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/food/${userId}`);
      setSymptomsData(response.data);
    } catch (error) {
      console.error('Error fetching symptoms data:', error);
    }
  };

  const generatePDF = async () => {
    try {
      const htmlContent = generateHTML(symptomsData);
      const options = {
        html: htmlContent,
        fileName: 'food_data',
        directory: 'Documents',
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      Alert.alert('PDF created:', pdf.filePath);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateHTML = (data) => {
    const tableRows = data.map((item, index) => (
      `<tr>
        <td>${item.date}</td>
        <td>${item.breakfast}</td>
        <td>${item.lunch}</td>
        <td>${item.dinner}</td>
        <td>${item.snacks}</td>
        <td>${item.water}</td>
        <td>${item.stressLevel}</td>
        <td>${item.triggeredFood}</td>
      </tr>`
    ));
    return `
      <html>
        <head>
        <title>IBD Companion App</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; }
          </style>
        </head>
        <body>
        <h1 style="text-align: center;">IBD Companion App</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Snacks</th>
                <th>Water Intake</th>
                <th>Stress Level</th>
                <th>Triggered Food</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join('')}
            </tbody>
          </table>
        </body>
      </html>`;
  };

  return (
    <><View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food Item Data</Text>
      </View>
      <ScrollView horizontal={true} vertical={true} >
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={['Date', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Water Intake', 'Stress Level','Triggered Food']}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={symptomsData.map((item, index) => [item.date, item.breakfast, item.lunch, item.dinner, item.snacks, item.water, item.stressLevel,item.triggeredFood])} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
      <View  style={{top:43}}>
        <Button title="Download PDF" onPress={generatePDF} />
      </View>
      
    </View>
    <View style={{flex:0.2}}>
       <Footer /> 
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'blueviolet',
    padding: 10,
    height: 70,
    marginBottom: 10,
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
  head: { height: 60, backgroundColor: '#f1f8ff' },
  headText: { margin: 6, fontWeight: 'bold', textAlign: 'center', width: 100 }, // Set a fixed width for each column
  text: { margin: 6, textAlign: 'center', width: 100 }, // Set a fixed width for each column
});

export default FoodItem;
