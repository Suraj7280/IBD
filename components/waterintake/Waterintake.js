import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Footer from '../footer/Footer';

const Waterintake = ({ navigation }) => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('username');
      const response = await axios.get(`http://10.0.2.2:3000/water-intake/${userId}`);
      setWaterData(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const generatePDF = async () => {
    try {
      const htmlContent = generateHTML(waterData);
      const options = {
        html: htmlContent,
        fileName: 'water_data',
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
       
        <td>${item.amount}</td>
      
      </tr>`
    ));
    return `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Date</th>
               
                <th>Water Intake in cups</th>
              
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
    <>
     <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Water Intake Data</Text>
      </View>
      <ScrollView vertical={true}>
        <View >
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' ,}}>
            <Row
              data={['Date','Water Intake in cups']}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={waterData.map((item, index) => [item.date,item.amount,])} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
      <View  style={{top:43}}>
        <Button title="Download PDF" onPress={generatePDF} />
      </View>
    </View>
    <View style={{flex:0.2}}>
       <Footer/> 
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

export default Waterintake;
