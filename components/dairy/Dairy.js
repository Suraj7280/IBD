// App.js

import React from 'react';
import { View, Text, TouchableOpacity,Image, StyleSheet } from 'react-native';
import Symptoms from '../symptoms/Symptoms';
import Food from '../food/Food';
import Footer from '../footer/Footer';


const Dairy = ({navigation}) => {
 

  return (
    <>
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Details</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(Symptoms)}>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Symptoms Details</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => navigation.navigate(Food)}>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Food Details</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        
        
      </View>
      <Footer />
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 70,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'white'
  },
  imagehead:{
    top:10,
    display:'flex',
    flexDirection:'row',
    height:80,
    width:'100%',
    borderWidth: 1, 
    borderColor: 'blueviolet', 
    borderRadius: 5, 
    padding:13,
    

  },
  texthead:{
    color:'black',
    fontSize:28,
    fontWeight:'bold',
    left:30
  },
  imageheads:{
    top:20,
    display:'flex',
    flexDirection:'row',
    height:80,
    width:'100%',
    borderWidth: 1, // Add border width
    borderColor: 'blueviolet', // Set border color
    borderRadius: 5, // Optional: Add border radius for rounded corners
    padding:13
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height:1000
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
  itemContainer: {
    padding: 16,
  },
  item: {
    color: 'black',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});

export default Dairy;