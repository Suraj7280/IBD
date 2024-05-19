//import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
 
} from 'react-native';
import Footer from '../footer/Footer';



const Bmi = ({navigation}) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Dont leave the box blank');
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    const bmiResult = (weightInKg / (heightInM * heightInM)).toFixed(2);

    setBMI(bmiResult);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.uheader}>
        <Text style={styles.theader}>Calculate BMI</Text>
      </View>
      <View style={styles.container}>
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
        <Button title="Calculate BMI" onPress={calculateBMI} color='blueviolet' />
        {bmi && (
          <Text style={styles.result}>
            Your BMI: {bmi} ({interpretBMI(parseFloat(bmi))})
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <Footer />
        
      </View>
    </View>
  );
};

const interpretBMI = bmiValue => {
  if (bmiValue < 18.5) return 'Underweight';
  if (bmiValue < 24.9) return 'Normal Weight';
  if (bmiValue < 29.9) return 'Overweight';
  return 'Obese';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: 'darkorchid',
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

export default Bmi;
