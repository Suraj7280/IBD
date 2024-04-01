import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions ,ScrollView } from 'react-native';
import Symptomdata from '../symptomdata/Symptomdata';
import FoodItem from '../fooditem/FoodItem';
import Waterintake from '../waterintake/Waterintake';
import Footer from '../footer/Footer';

const Search = ({ navigation }) => {
    const { height } = Dimensions.get('window');
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
        </View>
        <View style={{flex:1,height: height - 0 }}><TouchableOpacity onPress={() => navigation.navigate(Symptomdata)}>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Symptoms Data</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => navigation.navigate(FoodItem)}>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Food Item Data</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => navigation.navigate(Waterintake)}>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>Water Intake Data</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} /></View>
        
        <View>
            <Footer />
        </View>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: 'white',
    
  flex:1
 
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

export default Search;
