import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Footer from '../footer/Footer';



const Calories = ({navigation}) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintenance');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      alert('Please fill in all fields');
      return;
    }

    const BMR = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    const activityMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9,
    };
    const TDEE = BMR * activityMultipliers[activityLevel];

    let dailyCalories = 0;
    if (goal === 'maintenance') {
      dailyCalories = TDEE;
    } else if (goal === 'weightLoss') {
      dailyCalories = TDEE - 500; // Create a calorie deficit
    } else if (goal === 'weightGain') {
      dailyCalories = TDEE + 500; // Create a calorie surplus
    }

    setCalories(dailyCalories.toFixed(0));
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.uheader}>
          <Text style={styles.theader}>Calories Calculator For Men</Text>
         
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Age (years):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            keyboardType="numeric"
            value={age}
            onChangeText={text => setAge(text)}
            placeholderTextColor='black'
          />
          <Text style={styles.label}>Weight (kg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={text => setWeight(text)}
            placeholderTextColor='black'
          />
          <Text style={styles.label}>Height (cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter height"
            keyboardType="numeric"
            value={height}
            onChangeText={text => setHeight(text)}
            placeholderTextColor='black'
          />
          <Text style={styles.label}>Activity Level:</Text>
          <Picker
            selectedValue={activityLevel}
            onValueChange={itemValue => setActivityLevel(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Lightly Active" value="lightlyActive" />
            <Picker.Item label="Moderately Active" value="moderatelyActive" />
            <Picker.Item label="Very Active" value="veryActive" />
            <Picker.Item label="Super Active" value="superActive" />
          </Picker>
          <Text style={styles.label}>Goal:</Text>
          <Picker
            selectedValue={goal}
            onValueChange={itemValue => setGoal(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Maintenance" value="maintenance" />
            <Picker.Item label="Weight Loss" value="weightLoss" />
            <Picker.Item label="Weight Gain" value="weightGain" />
          </Picker>
          <Button title="Calculate Calories" onPress={calculateCalories} color="blueviolet"/>
          {calories !== null && (
            <Text style={styles.result}>Daily Calories: {calories} kcal</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    height: 550,
    marginTop: 30,
    marginBottom: 10,
   
    elevation: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  picker: {
    height: 40,
    marginBottom: 10,
    color:'black'
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  uheader: {
    elevation: 5,
    backgroundColor: 'blueviolet',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  theader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    
   
  },
  mheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 27,
    textAlign: 'center',
  },
  footer: {
    height: 70,
    backgroundColor: 'white',
  },
  subhcontainer: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Calories;
